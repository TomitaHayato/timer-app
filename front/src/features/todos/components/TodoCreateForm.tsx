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
      <form className="join join-vertical w-full" onSubmit={ handleSubmit(onSubmit) }>
        <div className="join w-full">
          <input
            className="input join-item rounded-l-xl"
            placeholder="Title"
            { ...register('title', {
              required: '! Titleを入力してください',
              maxLength: {
                value: 255,
                message: "255文字以内で入力してください",
              }
            })}/>

          { <input type="submit" value='作成' className="join-item btn btn-info rounded-r-xl" disabled={!isAuth || loading}/> }
        </div>

        {/* 期限を指定 */}
        <div className="flex justify-start mt-0.5 w-1/2">
          <button type="button" popoverTarget="rdp-popover" className="input input-sm px-6 rounded-xl" style={{ anchorName: "--rdp" } as React.CSSProperties}>
            {deadline ? dayjs(deadline).format('YYYY年 MM月DD日') : "Todoの期限を指定"}
          </button>

          <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
            <DayPicker
              className="react-day-picker text-base"
              mode="single"
              selected={deadline}
              onSelect={setDeadline} />
          </div>
        </div>
      </form>
    </>
  )
}
