export type Todo = {
  title: string,
  expire?: Date,
  status: boolean,
}

export type TodoAdd = {
  title: string,
  expire?: Date,
}

export type Todos = Todo[]

export type TodosState = {
  todos: Todo[],
  loading: boolean,
  error: string | null,
}
