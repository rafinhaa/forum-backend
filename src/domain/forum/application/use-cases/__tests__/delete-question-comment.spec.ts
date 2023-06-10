import { makeQuestion } from "__tests__/factories/make-question";
import { InMemoryQuestionCommentsRepository } from "__tests__/repositories/in-memory-question-comments-repository";
import { DeleteQuestionCommentUseCase } from "../delete-question-comment";
import { makeQuestionComment } from "__tests__/factories/make-question-comment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user question", async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryQuestionCommentsRepository.create(questionComment);

    expect(
      async () =>
        await sut.execute({
          questionCommentId: questionComment.id.toValue(),
          authorId: "author-2",
        })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be not find a question", async () => {
    const questionComment = makeQuestionComment();

    expect(
      async () =>
        await sut.execute({
          questionCommentId: questionComment.id.toValue(),
          authorId: questionComment.authorId.toValue(),
        })
    ).rejects.toBeInstanceOf(Error);
  });
});
