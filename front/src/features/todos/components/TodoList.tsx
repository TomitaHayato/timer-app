import type { Todo, Todos } from "../types/todoType";
import TodoItem from "./TodoItem"

type Props = {
  todos: Todos,
}

export default function TodoList({ todos }: Props) {
  return(
    <>
      <ul className="list rounded-box shadow-md w-full bg-base-200">
        { todos.map((todo: Todo, index: number) => <TodoItem key={todo.id} todo={todo} index={index + 1} />) }
      </ul>
    </>
  )
}
