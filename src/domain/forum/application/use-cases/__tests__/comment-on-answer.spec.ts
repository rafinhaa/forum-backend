import { InMemoryAnswersRepository } from "__tests__/repositories/in-memory-answers-repository";
import { makeAnswer } from "__tests__/factories/make-answer";
import { CommentOnAnswerUseCase } from "../comment-on-answer";
import { InMemoryAnswerCommentsRepository } from "__tests__/repositories/in-memory-answer-comments-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toValue(),
      authorId: answer.authorId.toValue(),
      content: "content",
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toBe("content");
  });

  it("should be not find a answer", async () => {
    const answer = makeAnswer();

    expect(
      async () =>
        await sut.execute({
          answerId: answer.id.toValue(),
          authorId: answer.authorId.toValue(),
          content: "content",
        })
    ).rejects.toBeInstanceOf(Error);
  });
});
