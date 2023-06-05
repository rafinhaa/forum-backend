import { InMemoryQuestionsRepository } from "__tests__/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "../delete-question";
import { makeQuestion } from "__tests__/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswersRepository } from "__tests__/repositories/in-memory-answers-repository";
import { ChooseQuestionBestAnswer } from "../choose-question-best-answer";
import { makeAnswer } from "__tests__/factories/make-answer";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswer;

describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswer(inMemoryAnswersRepository, inMemoryQuestionsRepository);
  });

  it("should be able to choose a question", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: question.authorId.toValue(),
      answerId: answer.id.toValue(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toBe(answer.id)
  });

  it("should be not able to choose another user question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    expect(
      async () =>
        await sut.execute({
          authorId: "author-2",
          answerId: answer.id.toValue(),
        })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be not find a question", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    expect(
      async () =>
        await sut.execute({
          authorId: "unknown-author-id",
          answerId: answer.id.toValue(),
        })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be not find a answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    expect(
      async () =>
        await sut.execute({
          authorId: question.authorId.toValue(),
          answerId: "unknown-answer-id",
        })
    ).rejects.toBeInstanceOf(Error);
  });
});
