import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { selectTodos, updateTodoIsCompleted } from "../todoSlice";

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
    <div className="text-center tooltip">
      <div className="tooltip-content">
        <p className="text-xs">未完了に</p>
      </div>
      {
        <button className="btn size-7 btn-info btn-circle" disabled={loading} onClick={handleClick}>
          <span className="icon-[line-md--rotate-270] size-5"></span>
        </button>
      }
    </div>
  )
}