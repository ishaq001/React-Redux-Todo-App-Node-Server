export interface Todo {
  todo: string;
  isDone: boolean;
  _id?: string;
}

export interface UserState {
  todos: Todo[];
  status: "idle" | "pending" | "succeed" | "failed";
}
