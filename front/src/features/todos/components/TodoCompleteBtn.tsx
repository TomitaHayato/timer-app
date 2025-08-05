import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { devLog } from "../../../utils/logDev";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { selectTodos, updateTodoIsCompleted } from "../todoSlice";

type Props = {
  id: string,
}

export function TodoCompleteBtn({ id }: Props) {
  devLog('TodoCompleteBtn コンポーネント')
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectTodos);

  const handleClick = async() => {
    try {
      // dispatch
      await dispatch(updateTodoIsCompleted(id)).unwrap();
      toastSuccessRB('Todoを完了しました', { autoClose: 2000 })
    } catch {
      const errorMessage = error || 'Todoの更新に失敗しました'
      toastErrorRB(errorMessage, { autoClose: 2000 })
    }
  }

  return(
    <>
      { <button className="btn btn-xs btn-success btn-circle" disabled={loading} onClick={handleClick}>✔︎</button> }
    </>
  )
}

