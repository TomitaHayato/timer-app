import dayjs from "dayjs";
import type { Todo } from "../types/todoType"
import { TodoCompleteBtn } from "./TodoCompleteBtn";
import { TodoDeleteBtn } from "./TodoDeleteBtn";
import { TodoRebornBtn } from "./TodoRebornBtn";
import { deadlineColor } from "../../../utils/class";

type Props ={
  todo: Todo,
}

export default function TodoItem({ todo }: Props) {
  return(
    <>
      <li className="list-row items-center px-2 py-2 mb-1 text-sm bg-gray-600">
        {
          todo.isCompleted
          ? <TodoRebornBtn   id={todo.id} />
          : <TodoCompleteBtn id={todo.id} /> 
        }

        <div>
          <p>{todo.title}</p>
          {
            !todo.isCompleted && todo.deadline
            && <p className={`${deadlineColor(todo.deadline)} text-xs`}>{dayjs(todo.deadline).format('YYYY年 MM月DD日')}</p>
          }
        </div>

        <TodoDeleteBtn id={todo.id} />
      </li>
    </>
  )
}