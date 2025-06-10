import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { selectTodos, updateTodoIsCompleted } from "../todoSlice";
import { LoadingBtnXs } from "./LoadingBtnXs";

type Props = {
  id: string,
}

export function TodoRebornBtn({ id }: Props) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectTodos);
  
  const handleClick = async() => {
    try {
      // dispatch
      await dispatch(updateTodoIsCompleted(id)).unwrap();
      toastSuccessRB('Todoを未達成にしました', { autoClose: 2000 })
    } catch {
      const errorMessage = error || 'Todoを未達成にできませんでした'
      toastErrorRB(errorMessage, { autoClose: 2000 })
    }
  }

  return(
    <>
      {
        loading
        ? <LoadingBtnXs />
        : <button className="btn btn-sm btn-info btn-circle" onClick={handleClick}>↩︎</button>
      }
    </>
  )
}