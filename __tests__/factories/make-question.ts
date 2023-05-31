import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/values-objects/slug";

export const makeQuestion = (override?: Partial<Question>): Question => {
  return Question.create({
    authorId: new UniqueEntityID(),
    title: "Example question",
    content: "Example content",
    slug: Slug.create("example-question"),
    ...override,
  });
};
