import { InMemoryQuestionsRepository } from "__tests__/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "../delete-question";
import { makeQuestion } from "__tests__/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "../errors/resource-not-found- error";
import { NotAllowedError } from "../errors/not-found-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to delete a question", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID("question-1"));

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: newQuestion.authorId.toValue(),
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it("should be not able to delete a question", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID("question-1"));

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: "author-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should be not find a question", async () => {
    const newQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: "question-2",
      authorId: "author-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
