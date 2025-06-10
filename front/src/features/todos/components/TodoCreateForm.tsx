import { useForm } from "react-hook-form"
import type { TodoAddParams } from "../types/todoType"
import { devLog } from "../../../utils/logDev"
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast"
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks"
import { createTodo, selectTodos } from "../todoSlice"
import { selectAuthStatus } from "../../session/slices/sessionSlice"

export default function TodoCreateForm() {
  const isAuth = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectTodos)
  const { register, handleSubmit, formState: { errors }, reset, } = useForm<TodoAddParams>()

  const onSubmit = async(data: TodoAddParams) => {
    devLog('Todo作成データ:', data);
    try {
      await dispatch(createTodo(data)).unwrap();
      reset();
      toastSuccessRB('Todoを追加しました', { autoClose: 2000 });
    } catch {
      const errorMessage = error || 'Todoを作成できませんでした';
      toastErrorRB(errorMessage);
    }
  }

  return(
    <>
      { errors.title?.message && <p className="text-error">{errors.title.message}</p> }
      { !isAuth && <p className="text-error">ログインが必要です</p> }
      <form className="join w-full" onSubmit={ handleSubmit(onSubmit) }>
        <input
          className="input join-item rounded-l-xl"
          placeholder="Title"
          {...register('title', { required: '! Titleを入力してください' })}/>

        {
          loading
          ? <button className="join-item btn btn-info rounded-r-xl"><span className="loading loading-dots loading-xs"></span></button>
          : <input type="submit" value='作成' className="join-item btn btn-info rounded-r-xl" disabled={!isAuth}/>
        }
      </form>
    </>
  )
}
