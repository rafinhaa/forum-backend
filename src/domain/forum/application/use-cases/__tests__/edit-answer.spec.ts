import { EditAnswerUseCase } from "../edit-answer";
import { InMemoryAnswersRepository } from "__tests__/repositories/in-memory-answers-repository";
import { makeAnswer } from "__tests__/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({},
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: newAnswer.authorId.toValue(),
      content: 'Conteúdo teste',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste',
    })
  })

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        answerId: newAnswer.id.toValue(),
        authorId: "author-2",
        content: "Conteúdo teste",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should be not find a answer", async () => {

    expect(
      async () =>
        await sut.execute({
          answerId: "answer-1",
          authorId: "author-2",
          content: "Conteúdo teste",
        })
    ).rejects.toBeInstanceOf(Error);
  });
});
