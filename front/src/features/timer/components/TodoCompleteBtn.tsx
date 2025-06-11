import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { LoadingBtnXs } from "../../todos/components/LoadingBtnXs";
import { selectTodos, updateTodoIsCompleted } from "../../todos/todoSlice";
import type { Todo } from "../../todos/types/todoType";

type Props = {
  id: string,
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
}

export function TodoCompleteBtn({ id, setTodo }: Props) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectTodos);

  const handleClick = async() => {
    try {
      // dispatch
      await dispatch(updateTodoIsCompleted(id)).unwrap();
      setTodo(null)
      toastSuccessRB('Todoを更新しました', { autoClose: 2000 });
    } catch {
      const errorMessage = error || 'Todoの更新に失敗しました'
      toastErrorRB(errorMessage, { autoClose: 2000 })
    }
  }

  return(
    <>
      {
        loading
        ? <LoadingBtnXs />
        : <button className="btn btn-sm btn-success" onClick={handleClick}>完了</button>
      }
    </>
  )
}