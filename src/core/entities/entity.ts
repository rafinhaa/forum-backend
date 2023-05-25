import { randomUUID } from "node:crypto";

export class Entity<Props> {
  private _id: string;
  protected props: any;

  get id(): string {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }
}
