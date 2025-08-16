import { useAppDispatch, useAppSelector } from "../../../../reduxStore/hooks";
import { toastErrorRB, toastSuccessRB } from "../../../../utils/toast";
import { selectTodos, updateTodoIsCompleted } from "../../todoSlice";
import type { Todo } from "../../../../types/todoType";

type Props = {
  id: string,
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
}

export function TodoCompleteBtnSm({ id, setTodo }: Props) {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectTodos);

  const handleClick = async() => {
    try {
      // dispatch
      await dispatch(updateTodoIsCompleted(id)).unwrap();
      setTodo(null)
      toastSuccessRB('Todoを完了しました', { autoClose: 2000 });
    } catch {
      const errorMessage = error || 'Todoの更新に失敗しました'
      toastErrorRB(errorMessage, { autoClose: 2000 })
    }
  }

  return(
    <>
      <button className="btn btn-sm btn-success" onClick={handleClick}>完了</button>
    </>
  )
}