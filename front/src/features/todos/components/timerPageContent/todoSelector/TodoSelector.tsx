import { useEffect, useState } from "react"
import type { Todo } from "../../../../../types/todoType"
import { Modal } from "../../../../../components/Modal";
import { openModal } from "../../../../../utils/modelCtl";
import { selectSortedTodos } from "../../../todoSlice";
import { useAppSelector } from "../../../../../reduxStore/hooks";
import { SelectedTodo } from "./SelectedTodo";
import { selectAuthStatus } from "../../../../session/slices/sessionSlice";
import { btnMdClass } from "../../../../../utils/class";
import { selectSimpleBg } from "../../../../display/visibleSlice";
import { TodoOptions } from "./TodoOptions";

export function TodoSelector() {
  const todos = useAppSelector(selectSortedTodos);
  const isAuth = useAppSelector(selectAuthStatus);
  const [ todoId, setTodoId ] = useState<string | null>(null);
  const simpleBg = useAppSelector(selectSimpleBg);

  useEffect(() => {
    if(!isAuth) setTodoId(null);
  }, [isAuth]);

  return(
    <>
      <div className="max-w-1/3 text-center mx-auto my-4">
        {
          todoId
          ? <SelectedTodo todoId={todoId} setTodoId={setTodoId}/>
          : <button disabled={!isAuth} className={btnMdClass(simpleBg)} onClick={() => openModal('todoSelector')}>Todoを選択</button>
        }
      </div>

      <Modal modalId={'todoSelector'}>
        <p className="text-center mb-2">Todoを選択してください</p>
        {
          todos.length === 0
          ? <p className="text-center text-lg">Todoがありません</p>
          : todos.filter((todo: Todo) => !todo.isCompleted).map((todo: Todo) => <TodoOptions key={todo.id} todo={todo} setTodoId={setTodoId}/>)
        }
      </Modal>
    </>
  )
}