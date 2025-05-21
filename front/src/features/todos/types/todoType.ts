export type Todo = {
  id: number,
  title: string,
  expire?: Date,
  status: boolean,
}

export type TodoAdd = {
  title: string,
  expire?: Date,
}

export type Todos = Todo[]
