import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async findById(questionId: string): Promise<Question | null> {
    return (
      this.items.find((question) => question.id.toString() === questionId) ??
      null
    );
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return this.items.find((question) => question.slug.value === slug) ?? null;
  }

  async create(question: Question) {
    this.items.push(question);
  }

  async delete(question: Question) {
    const index = this.items.findIndex((q) => q.id === question.id);
    this.items.splice(index, 1);
  }
}
