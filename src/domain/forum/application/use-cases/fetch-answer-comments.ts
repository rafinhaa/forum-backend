import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

const DEFAULT_LIMIT = 20;

interface FetchAnswerCommentsCaseRequest {
  answerId: string;
  page: number;
  limitPerPage?: number;
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
    limitPerPage,
  }: FetchAnswerCommentsCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const limit = limitPerPage ?? DEFAULT_LIMIT;

    const answerComments =
      await this.answerCommentsRepository.findManyByQuestionId(answerId, {
        page,
        limitPerPage: limit,
      });

    return {
      answerComments,
    };
  }
}
