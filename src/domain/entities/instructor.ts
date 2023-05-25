import { Entity } from "../../core/entities/entity";

interface InstructorProps {
  id: string;
  name: string;
}

export class Instructor extends Entity<InstructorProps> {}
