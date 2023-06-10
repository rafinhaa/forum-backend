import { GetQuestionBySlugUseCase } from "../get-question-by-slug";
import { InMemoryQuestionsRepository } from "__tests__/repositories/in-memory-questions-repository";
import { makeQuestion } from "__tests__/factories/make-question";
import { ResourceNotFoundError } from "../errors/resource-not-found- error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: newQuestion.slug.value,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value?.question.id).toBeTruthy();
      expect(result.value?.question.title).toBe(newQuestion.title);
    }
  });

  it("should not be able to get a question by slug", async () => {
    const result = await sut.execute({ slug: "example-question" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
