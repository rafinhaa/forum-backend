import { makeAnswer } from "__tests__/factories/make-answer";
import { InMemoryAnswerCommentsRepository } from "__tests__/repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "../delete-answer-comment";
import { makeAnswerComment } from "__tests__/factories/make-answer-comment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer Comment", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to delete a answer comment", async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete another user answer", async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID("author-1"),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment);

    expect(
      async () =>
        await sut.execute({
          answerCommentId: answerComment.id.toValue(),
          authorId: "author-2",
        })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be not find a answer", async () => {
    const answerComment = makeAnswerComment();

    expect(
      async () =>
        await sut.execute({
          answerCommentId: answerComment.id.toValue(),
          authorId: answerComment.authorId.toValue(),
        })
    ).rejects.toBeInstanceOf(Error);
  });
});
