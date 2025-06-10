import type { Todo } from "../types/todoType"
import { TodoCompleteBtn } from "./TodoCompleteBtn";
import { TodoDeleteBtn } from "./TodoDeleteBtn";
import { TodoRebornBtn } from "./TodoRebornBtn";

type Props ={
  todo: Todo,
}

export default function TodoItem({ todo }: Props) {
  return(
    <>
      <li className="list-row items-center px-2">
        <div className="text-xl font-thin opacity-30 tabular-nums">・</div>
        <div>
          <p>{todo.title}</p>
        </div>

        {
          todo.isCompleted
          ? <TodoRebornBtn   id={todo.id} />
          : <TodoCompleteBtn id={todo.id} /> 
        }

        <TodoDeleteBtn id={todo.id} />
      </li>
    </>
  )
}