import type { Todo } from "../types/todoType"
import { TodoDeleteBtn } from "./TodoDeleteBtn";

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
          todo.status
            ? <button className="btn btn-sm btn-info btn-circle">↩︎</button>
            : <button className="btn btn-sm btn-success btn-circle">✔︎</button>
        }

        <TodoDeleteBtn id={todo.id} />
      </li>
    </>
  )
}