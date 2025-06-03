export type Todo = {
  title: string,
  isCompleted: boolean,
  expired?: Date,
}

export type Todos = Todo[]

export type createTodoParams = {
  title: string,
  expired?: Date,
}

export type updateTodoParams = {
  title?: string,
  expired?: Date,
}