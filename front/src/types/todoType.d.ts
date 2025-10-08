export type Todo = {
  id: string,
  title: string,
  deadline?: Date,
  isCompleted: boolean,
  completedAt?: Date
}

export type TodoAddParams = {
  title: string,
  deadline?: Date,
}

export type TodoUpdateParams = {
  id: string,
  title: string,
  deadline?: Date,
}

export type TodoIsCompletedUpdateParams = {
  newIsCompleted: boolean
}

export type Todos = Todo[]

export type TodosState = {
  todos: Todo[],
  loading: boolean,
  error: string | null,
}
