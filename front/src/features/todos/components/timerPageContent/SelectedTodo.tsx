import dayjs from "dayjs"
import type { Todo } from "../../../../types/todoType"
import { openModal } from "../../../../utils/modelCtl"
import { useEffect } from "react"
import { TodoCompleteBtnSm } from "./TodoCompleteBtnSm"
import { deadlineText, selectedTodoClass } from "../../utils/class"
import { useAppSelector } from "../../../../reduxStore/hooks"
import { selectSimpleBg } from "../../../display/visibleSlice"

type Props = {
  todo: Todo,
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
}

export function SelectedTodo({ todo, setTodo }: Props) {
  const simpleBg = useAppSelector(selectSimpleBg);

  useEffect(() => {
    if (todo.isCompleted) setTodo(null);
  }, [setTodo, todo.isCompleted])

  return(
    <div className={selectedTodoClass(simpleBg)}>
      <div className="w-full flex justify-between items-center gap-4 pt-8 pb-2 px-4 relative">
        <TodoCompleteBtnSm id={todo.id} setTodo={setTodo}/>

        <div>
          <p className="text-lg">{todo.title}</p>
          {
            !todo.isCompleted && todo.deadline
            && <p className={`${deadlineText(todo.deadline)}`}>{dayjs(todo.deadline).format('YYYY年 MM月DD日')}</p>
          }
        </div>

        <button className="btn btn-sm btn-primary" onClick={() => openModal('todoSelector')}>
          変更
        </button>

        <div className="absolute top-1 right-1">
          <button className="py-1 px-2 hover:text-error active:scale-90" onClick={() => setTodo(null)}>
            <i className="icon-[weui--close-filled] size-4 font-semibold"/>
          </button>
        </div>
      </div>
    </div>
  )
}
