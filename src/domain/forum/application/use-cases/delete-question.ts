import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found- error";
import { NotAllowedError } from "./errors/not-found-allowed-error";

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError("Question not found"));
    }

    if (question.authorId.toValue() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionsRepository.delete(question);

    return right({});
  }
}
