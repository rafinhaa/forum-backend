import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found- error";
import { NotAllowedError } from "./errors/not-found-allowed-error";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const question = await this.answersRepository.findById(answerId);

    if (!question) {
      return left(new ResourceNotFoundError("Question not found"));
    }

    if (question.authorId.toValue() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answersRepository.delete(question);

    return right({});
  }
}
