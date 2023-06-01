import { InMemoryAnswersRepository } from "__tests__/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "../delete-answer";
import { makeAnswer } from "__tests__/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityID("answer-1"));

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: newAnswer.authorId.toValue(),
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should be not able to delete a answer", async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityID("answer-1"));

    await inMemoryAnswersRepository.create(newAnswer);

    expect(
      async () =>
        await sut.execute({
          answerId: newAnswer.id.toValue(),
          authorId: "author-2",
        })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be not find a answer", async () => {
    const newAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(newAnswer);

    expect(
      async () =>
        await sut.execute({
          answerId: "answer-2",
          authorId: "author-2",
        })
    ).rejects.toBeInstanceOf(Error);
  });
});
