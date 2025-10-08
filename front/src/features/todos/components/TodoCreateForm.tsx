import { useForm } from "react-hook-form"
import type { TodoAddParams } from "../../../types/todoType"
import { devLog } from "../../../utils/logDev"
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast"
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks"
import { createTodo, selectTodos } from "../todoSlice"
import { selectAuthStatus } from "../../auth/slices/authSlice"
import { DayPicker } from "react-day-picker"
import { useState } from "react"
import dayjs from "dayjs"

export default function TodoCreateForm() {
  const isAuth = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectTodos)
  const { register, handleSubmit, formState: { errors }, reset, } = useForm<TodoAddParams>()

  const [ deadline, setDeadline ] = useState<Date>()

  const onSubmit = async(data: TodoAddParams) => {
    const paramsData = {
      ...data,
      deadline,
    }
    devLog('Todo作成データ:', paramsData);
    try {
      await dispatch(createTodo(paramsData)).unwrap();
      reset();
      setDeadline(undefined);
      toastSuccessRB('Todoを追加しました', { autoClose: 2000 });
    } catch {
      const errorMessage = error || 'Todoを作成できませんでした';
      toastErrorRB(errorMessage);
    }
  }

  return(
    <>
      { errors.title?.message && <p className="text-error text-start">{errors.title.message}</p> }
      { !isAuth && <p className="text-error">ログインが必要です</p> }
      <form className="flex flex-col items-center w-full" onSubmit={ handleSubmit(onSubmit) }>
        <input
          className="input rounded-xl mb-4"
          placeholder="Title"
          { ...register('title', {
            required: '! Titleを入力してください',
            maxLength: {
              value: 255,
              message: "255文字以内で入力してください",
            }
          })}/>

        {/* 期限を指定 */}
        <div className="flex justify-start mt-0.5 w-1/2 mb-4">
          <button type="button" popoverTarget="day-picker" className="input rounded-xl" style={{ anchorName: "--date-form" } as React.CSSProperties}>
            {deadline ? dayjs(deadline).format('YYYY年 MM月DD日') : "Todoの期限を指定"}
          </button>

          <div popover="auto" id="day-picker" className="dropdown" style={{ positionAnchor: "--date-form" } as React.CSSProperties}>
            <DayPicker
              className="react-day-picker text-base"
              mode="single"
              selected={deadline}
              onSelect={setDeadline} />
          </div>
        </div>

        <input type="submit" value='作成' className="btn btn-wide btn-info" disabled={!isAuth || loading}/>
      </form>
    </>
  )
}
