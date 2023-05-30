import { CreationQuestionUseCase } from "../create-question";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

const fakeCreateRepository: QuestionsRepository = {
  create: async (question: Question): Promise<void> => {
    return;
  },
};

test("AnswerQuestionUseCase", async () => {
  const createQuestion = new CreationQuestionUseCase(fakeCreateRepository);
  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Nova resposta",
    content: "Nova resposta",
  });

  expect(question.id).toBeTruthy();
});
