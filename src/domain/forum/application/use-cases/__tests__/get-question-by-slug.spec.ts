import { GetQuestionBySlugUseCase } from "../get-question-by-slug";
import { InMemoryQuestionsRepository } from "__tests__/repositories/in-memory-questions-repository";
import { makeQuestion } from "__tests__/factories/make-question";
import { Slug } from "@/domain/forum/enterprise/entities/values-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question-2"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "example-question-2",
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toBe("Example question");
  });

  it("should not be able to get a question by slug", async () => {
    expect(
      async () => await sut.execute({ slug: "example-question" })
    ).rejects.toBeInstanceOf(Error);
  });
});
