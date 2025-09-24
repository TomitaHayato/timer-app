import dayjs from "dayjs"
import { openModal } from "../../../../../utils/modelCtl"
import { useEffect } from "react"
import { TodoCompleteBtnSm } from "./TodoCompleteBtnSm"
import { deadlineText, selectedTodoClass } from "../../../utils/class"
import { useAppSelector } from "../../../../../reduxStore/hooks"
import { selectSimpleBg } from "../../../../display/visibleSlice"
import { selectSortedTodos } from "../../../todoSlice"

type Props = {
  todoId: string,
  setTodoId: React.Dispatch<React.SetStateAction<string | null>>,
}

export function SelectedTodo({ todoId, setTodoId }: Props) {
  const simpleBg = useAppSelector(selectSimpleBg);
  const todos = useAppSelector(selectSortedTodos);
  const selectedTodo = todos.find(todo => todo.id === todoId);

  useEffect(() => {
    if (selectedTodo?.isCompleted) setTodoId(null);
  }, [setTodoId, selectedTodo?.isCompleted])

  if (!selectedTodo) return;

  return(
    <div className={selectedTodoClass(simpleBg)}>
      <div className="w-full flex justify-between items-center gap-4 pt-8 pb-2 px-4 relative">
        <TodoCompleteBtnSm id={todoId} setTodoId={setTodoId}/>

        <div>
          <p className="text-lg">{selectedTodo?.title}</p>
          {
            !selectedTodo.isCompleted && selectedTodo.deadline
            && <p className={`${deadlineText(selectedTodo.deadline)}`}>{dayjs(selectedTodo.deadline).format('YYYY年 MM月DD日')}</p>
          }
        </div>

        <button className="btn btn-sm btn-primary" onClick={() => openModal('todoSelector')}>
          変更
        </button>

        <div className="absolute top-1 right-1">
          <button className="py-1 px-2 hover:text-error active:scale-90" onClick={() => setTodoId(null)}>
            <i className="icon-[weui--close-filled] size-4 font-semibold"/>
          </button>
        </div>
      </div>
    </div>
  )
}
