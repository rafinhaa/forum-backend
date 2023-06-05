import { FetchRecentQuestionsUseCase } from "../fetch-recent-questions";
import { InMemoryQuestionsRepository } from "__tests__/repositories/in-memory-questions-repository";
import { makeQuestion } from "__tests__/factories/make-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date(2023,0,20)}));
    await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date(2023,0,18)}));
    await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date(2023,0,23)}));

    const {questions} = await sut.execute({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023,0,23),
      }),
      expect.objectContaining({
        createdAt: new Date(2023,0,20),
      }),
      expect.objectContaining({
        createdAt: new Date(2023,0,18),
      })
    ])
  });

  it("should be able to fetch paginate recent questions", async () => {
    for (let i = 1; i < 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date(2023,0,i)}));
    }
    const {questions} = await sut.execute({
      page: 1,
    })

    expect(questions.length).toEqual(20)
  });

  it("should be able to fetch paginate recent questions with limit", async () => {
    for (let i = 1; i < 10; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date(2023,0,i)}));
    }
    const {questions} = await sut.execute({
      page: 1,
      limitPerPage: 5
    })

    expect(questions.length).toEqual(5)
  });
});
