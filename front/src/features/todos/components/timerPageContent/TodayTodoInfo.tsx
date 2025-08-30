import dayjs from "dayjs"
import type { Todo } from "../../../../types/todoType"
import { TodoCompleteBtn } from "../TodoCompleteBtn"
import { TodoRebornBtn } from "../TodoRebornBtn"
import { TodoUpdateBtn } from "../TodoUpdateBtn"
import { TodoDeleteBtn } from "../TodoDeleteBtn"

type Props = {
  todo: Todo,
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

export function TodayTodoInfo({ todo, setIsEdit }: Props) {
  return(
    <>
      <li className="items-center px-2 py-1 mb-2 text-sm bg-gray-400 rounded-xl flex gap-2 justify-between w-60">
        {
          todo.isCompleted
          ? <TodoRebornBtn id={todo.id} />
          : <TodoCompleteBtn id={todo.id} /> 
        }

        <div>
          <p>{todo.title}</p>
          {
            todo.isCompleted && todo.completedAt
            && <p className={`text-success text-xs`}>
              完了日: {dayjs(todo.completedAt).format('YYYY年 MM月DD日')}
            </p>
          }
        </div>
        
        <div className="flex gap-4">
          {
            todo.isCompleted ||
            <TodoUpdateBtn setIsEdit={setIsEdit}/>
          }
          <TodoDeleteBtn id={todo.id} />
        </div>
      </li>
    </>
  )
}