import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { CommentProps, Comment } from "./comment";

export interface QuestionsCommentProps extends CommentProps {
  questionId: UniqueEntityID;
}

export class QuestionsComment extends Comment<QuestionsCommentProps> {
  get questionId() {
    return this.props.questionId;
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
