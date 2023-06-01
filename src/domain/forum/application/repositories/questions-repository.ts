import { Question } from "@/domain/forum/enterprise/entities/question";

export interface QuestionsRepository {
  findById(questionId: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  create(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
}
