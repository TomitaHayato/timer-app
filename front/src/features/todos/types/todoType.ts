export type Todo = {
  title: string,
  deadline?: Date,
  status: boolean,
}

export type TodoAdd = {
  title: string,
  deadline?: Date,
}

export type Todos = Todo[]

export type TodosState = {
  todos: Todo[],
  loading: boolean,
  error: string | null,
}
