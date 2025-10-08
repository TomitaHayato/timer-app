import { useAppDispatch, useAppSelector } from "../../../../../reduxStore/hooks";
import { toastErrorRB, toastSuccessRB } from "../../../../../utils/toast";
import { selectTodos, updateTodoIsCompleted } from "../../../todoSlice";

type Props = {
  id: string,
  setTodoId: React.Dispatch<React.SetStateAction<string | null>>,
}

export function TodoCompleteBtnSm({ id, setTodoId }: Props) {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectTodos);

  const handleClick = async() => {
    try {
      // dispatch
      await dispatch(updateTodoIsCompleted({ id, params: { newIsCompleted: true } })).unwrap();
      setTodoId(null)
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