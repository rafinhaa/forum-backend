import { InMemoryQuestionsRepository } from "__tests__/repositories/in-memory-questions-repository";
import { makeQuestion } from "__tests__/factories/make-question";
import { CommentOnQuestionUseCase } from "../comment-on-question";
import { InMemoryQuestionCommentsRepository } from "__tests__/repositories/in-memory-question-comments-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository
    );
  });

  it("should be able to comment on question", async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      questionId: question.id.toValue(),
      authorId: question.authorId.toValue(),
      content: "content",
    });

    expect(inMemoryQuestionCommentsRepository.items[0].content).toBe("content");
  });

  it("should be not find a question", async () => {
    const question = makeQuestion();

    expect(
      async () =>
        await sut.execute({
          questionId: question.id.toValue(),
          authorId: question.authorId.toValue(),
          content: "content",
        })
    ).rejects.toBeInstanceOf(Error);
  });
});
