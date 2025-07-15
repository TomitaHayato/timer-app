import dayjs from "dayjs"
import { deadlineColor } from "../../../utils/class"
import type { Todo } from "../types/todoType"
import { TodoCompleteBtn } from "./TodoCompleteBtn"
import { TodoRebornBtn } from "./TodoRebornBtn"
import { TodoUpdateBtn } from "./TodoUpdateBtn"
import { TodoDeleteBtn } from "./TodoDeleteBtn"

type Props = {
  todo: Todo,
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

// Todoのタイトルと期限、ボタン類を表示
export function TodoItemInfo({ todo, setIsEdit }: Props) {
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
          {
            todo.isCompleted && todo.completedAt
            && <p className={`text-success text-xs`}>
              完了日: {dayjs(todo.completedAt).format('YYYY年 MM月DD日')}
            </p>
          }
        </div>
        
        <div className="flex gap-4">
          <TodoUpdateBtn setIsEdit={setIsEdit}/>
          <TodoDeleteBtn id={todo.id} />
        </div>
      </li>
    </>
  )
}
