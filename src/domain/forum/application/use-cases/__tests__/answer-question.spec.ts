import { AnswerQuestionUseCase } from "../answer-question";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer): Promise<void> => {
    return;
  },
};

test("AnswerQuestionUseCase", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);
  const answer = await answerQuestion.execute({
    content: "Nova resposta",
    instructorId: "1",
    questionId: "1",
  });

  expect(answer.content).toBe("Nova resposta");
});