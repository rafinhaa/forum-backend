import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";

interface InstructorProps {
  id: UniqueEntityID;
  name: string;
}

export class Instructor extends Entity<InstructorProps> {}
