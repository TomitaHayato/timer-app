import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { selectTodos, updateTodoIsCompleted } from "../todoSlice";
import { LoadingBtnXs } from "./LoadingBtnXs";

type Props = {
  id: string,
}

export function TodoCompleteBtn({ id }: Props) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectTodos);

  const handleClick = async() => {
    try {
      // dispatch
      await dispatch(updateTodoIsCompleted(id)).unwrap();
      toastSuccessRB('Todoを更新しました', { autoClose: 2000 })
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
        : <button className="btn btn-xs btn-success btn-circle" onClick={handleClick}>✔︎</button>
      }
    </>
  )
}