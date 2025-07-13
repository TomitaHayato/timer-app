export type Todo = {
  title: string,
  isCompleted: boolean,
  deadline?: Date,
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