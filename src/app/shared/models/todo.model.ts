export class Todo {
  constructor(public task: string,
              public completed: boolean,
              public completedBy: string,
              public _id?: string) {}
}
