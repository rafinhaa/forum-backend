import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findById(answerId: string): Promise<Answer | null> {
    return (
      this.items.find((answer) => answer.id.toString() === answerId) ?? null
    );
  }

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((a) => a.id === answer.id);
    this.items.splice(index, 1);
  }
}
