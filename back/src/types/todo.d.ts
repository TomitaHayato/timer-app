export type Todo = {
  id: string,
  title: string,
  isCompleted: boolean,
  deadline?: Date | null,
  completedAt?: Date | null,
}

export type Todos = Todo[]

export type createTodoParams = {
  title: string,
  deadline?: Date,
}

export type updateTodoParams = {
  title?: string,
  deadline?: Date,
}