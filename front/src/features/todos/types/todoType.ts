export type Todo = {
  id: string,
  title: string,
  deadline?: Date,
  isCompleted: boolean,
}

export type TodoAddParams = {
  title: string,
  deadline?: Date,
}

export type Todos = Todo[]

export type TodosState = {
  todos: Todo[],
  loading: boolean,
  error: string | null,
}
