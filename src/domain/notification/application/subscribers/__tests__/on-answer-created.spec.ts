import { makeAnswer } from "__tests__/factories/make-answer";
import { OnAnswerCreated } from "../on-answer-created";
import { InMemoryAnswersRepository } from "__tests__/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "__tests__/repositories/in-memory-answer-attachments-repository";
import { InMemoryQuestionsRepository } from "__tests__/repositories/in-memory-questions-repository";
import { InMemoryQuestionAttachmentsRepository } from "__tests__/repositories/in-memory-question-attachments-repository";
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from "@/domain/notification/application/use-cases/send-notification";
import { InMemoryNotificationsRepository } from "__tests__/repositories/in-memory-notifications-repository";
import { makeQuestion } from "__tests__/factories/make-question";
import { SpyInstance } from "vitest";
import { waitFor } from "__tests__/utils/wait-for";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    );

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase);

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");
  });

  it("should send a notification when an answer is created", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    inMemoryQuestionsRepository.create(question);
    inMemoryAnswersRepository.create(answer);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
