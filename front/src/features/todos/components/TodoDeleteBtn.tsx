import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { devLog } from "../../../utils/logDev";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { deleteTodo, selectTodos } from "../todoSlice";
import { LoadingBtnXs } from "./LoadingBtnXs";

type Props = {
  id: string,
}

export function TodoDeleteBtn({ id }: Props) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectTodos);

  const handleDelete = async() => {
    try {
      await dispatch(deleteTodo(id)).unwrap();
      toastSuccessRB('Todoを削除しました', { autoClose: 2000 })
    } catch {
      const errorMessage = error || 'Todoの削除に失敗しました'
      toastErrorRB(errorMessage, { autoClose: 2000 })
      devLog('Todo削除処理失敗');
    }
  }

  return(
    <>
      {
        loading
        ? <LoadingBtnXs />
        : <button className="btn btn-sm btn-outline btn-square" onClick={handleDelete}>🗑️</button>
      }
    </>
  )
}