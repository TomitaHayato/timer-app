import type { Todo, Todos } from "../../../types/todoType";
import TodoItem from "./TodoItem"

type Props = {
  todos: Todos,
}

export default function TodoList({ todos }: Props) {
  return(
    <>
      <ul className="list rounded-box shadow-md w-full">
        { todos.map((todo: Todo) => <TodoItem key={todo.id} todo={todo}/>) }
      </ul>
    </>
  )
}
