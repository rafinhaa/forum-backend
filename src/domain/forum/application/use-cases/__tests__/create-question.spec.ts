import { CreationQuestionUseCase } from "../create-question";
import { InMemoryQuestionsRepository } from "__tests__/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreationQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreationQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "Nova pergunta",
      content: "Conteúdo da pergunta",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.value?.question
    );
  });
});
