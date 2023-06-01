import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const question = await this.answersRepository.findById(answerId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (question.authorId.toValue() !== authorId) {
      throw new Error("Unauthorized");
    }

    await this.answersRepository.delete(question);

    return {};
  }
}
