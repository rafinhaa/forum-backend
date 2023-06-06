import { makeAnswer } from "__tests__/factories/make-answer";
import { InMemoryAnswersRepository } from "__tests__/repositories/in-memory-answers-repository";
import { FetchQuestionsAnswersUseCase } from "../fetch-questions-answers";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionsAnswersUseCase;

const QUESTION1_ID = new UniqueEntityID("question-1");

describe("Fetch Questions Answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should be able to fetch questions answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ createdAt: new Date(2023, 0, 20), questionId: QUESTION1_ID })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ createdAt: new Date(2023, 0, 18), questionId: QUESTION1_ID })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ createdAt: new Date(2023, 0, 23), questionId: QUESTION1_ID })
    );

    const { answers } = await sut.execute({
      questionId: QUESTION1_ID.toString(),
      page: 1,
    });

    expect(answers).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023, 0, 23),
        questionId: QUESTION1_ID,
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 20),
        questionId: QUESTION1_ID,
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 18),
        questionId: QUESTION1_ID,
      }),
    ]);
  });

  it("should be able to fetch paginate que answers", async () => {
    for (let i = 1; i < 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          createdAt: new Date(2023, 0, i),
          questionId: QUESTION1_ID,
        })
      );
    }
    const { answers } = await sut.execute({
      questionId: QUESTION1_ID.toString(),
      page: 1,
    });

    expect(answers.length).toEqual(20);
  });

  it("should be able to fetch paginate que answers with limit", async () => {
    for (let i = 1; i < 10; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          createdAt: new Date(2023, 0, i),
          questionId: QUESTION1_ID,
        })
      );
    }
    const { answers } = await sut.execute({
      questionId: QUESTION1_ID.toString(),
      page: 1,
      limitPerPage: 5,
    });

    expect(answers.length).toEqual(5);
  });
});
