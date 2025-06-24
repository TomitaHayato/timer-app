import dayjs from "dayjs"
import type { Todo } from "../../todos/types/todoType"
import { openModal } from "../../../utils/modelCtl"
import { useEffect } from "react"
import { TodoCompleteBtn } from "./TodoCompleteBtn"
import { deadlineColor } from "../../../utils/class"

type Props = {
  todo: Todo,
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
}

export function SelectedTodo({ todo, setTodo }: Props) {

  useEffect(() => {
    if (todo.isCompleted) setTodo(null);
  }, [setTodo, todo.isCompleted])

  return(
    <>
      <div className="w-full flex justify-between items-center gap-4 pt-8 pb-2 px-4 shadow-2xl bg-gray-700 rounded-xl relative">
        <TodoCompleteBtn id={todo.id} setTodo={setTodo}/>

        <div>
          <p className="font-semibold text-lg">{todo.title}</p>
          {
            !todo.isCompleted && todo.deadline
            && <p className={`${deadlineColor(todo.deadline)} text-xs`}>{dayjs(todo.deadline).format('YYYY年 MM月DD日')}</p>
          }
        </div>

        <button className="btn btn-sm btn-primary" onClick={() => openModal('todoSelector')}>
          変更
        </button>

        <div className="absolute top-1 right-1">
          <button className="btn btn-sm btn-ghost" onClick={() => setTodo(null)}>
            ×
          </button>
        </div>
      </div>
    </>
  )
}
