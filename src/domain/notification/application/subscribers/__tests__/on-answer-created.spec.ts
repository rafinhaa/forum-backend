import { makeAnswer } from "__tests__/factories/make-answer";
import { OnAnswerCreated } from "../on-answer-created";
import { InMemoryAnswersRepository } from "__tests__/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "__tests__/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
  });

  it("should send a notification when an answer is created", async () => {
    const _onAnswerCreated = new OnAnswerCreated();

    const answer = makeAnswer();

    inMemoryAnswersRepository.create(answer);
  });
});
