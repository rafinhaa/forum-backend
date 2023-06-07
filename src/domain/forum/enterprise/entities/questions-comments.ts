import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface QuestionsCommentProps {
  authorId: UniqueEntityID;
  answerId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class QuestionsComment extends Entity<QuestionsCommentProps> {
  get authorId() {
    return this.props.authorId;
  }

  get answerId() {
    return this.props.answerId;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  static create(
    props: Optional<QuestionsCommentProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const answerComment = new QuestionsComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return answerComment;
  }
}
