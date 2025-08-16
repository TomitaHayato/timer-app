import dayjs from "dayjs"
import type { Todo, TodoAddParams } from "../../../types/todoType"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"
import { useAppDispatch } from "../../../reduxStore/hooks"
import { updateTodo } from "../todoSlice"
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast"

type Props = {
  todo: Todo,
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

// Todoの編集モード
export function TodoItemEdit({ todo, setIsEdit }: Props) {
  const dispatch = useAppDispatch();
  // 日付はステートで管理
  const [deadline, setDeadline] = useState<Date | undefined>();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<TodoAddParams>({
    defaultValues: { title: '' }
  });

  useEffect(() => {
    reset({ title: todo.title });
    setDeadline(todo.deadline);
  }, [todo, reset])

  const fetchUpdateTodo = async(data: { title: string }) => {
    const params: TodoAddParams = {
      ...data,
      deadline,
    }
    try {
      await dispatch(updateTodo({
        id: todo.id,
        params,
      }));
      toastSuccessRB('Todoを更新しました');
      setIsEdit(false)
    } catch {
      toastErrorRB('Todoの更新に失敗しました')
    }
  }

  return(
    <>
      <li className="list-row items-center px-2 py-2 mb-1 text-sm bg-gray-600">
        <div>
          <span className="icon-[line-md--confirm-circle-filled-to-circle-filled-transition] size-5 text-pink-400"></span>
        </div>

        <div>
          <form onSubmit={handleSubmit(fetchUpdateTodo)}>
            { errors?.title?.message && <p className="text-xs text-error">{errors.title.message}</p> }
            <input
              type="text"
              className="input input-sm"
              { ...register('title', { required: '※タイトルを入力してください' }) }/>

            <div className="flex justify-start mt-0.5">
              <button type="button" popoverTarget="rdp-popover-edit" className="input input-sm px-6 rounded-xl" style={{ anchorName: "--rdp" } as React.CSSProperties}>
                {deadline ? dayjs(deadline).format('YYYY年 MM月DD日') : "Todoの期限を指定"}
              </button>

              <div popover="auto" id="rdp-popover-edit" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
                <DayPicker
                  className="react-day-picker text-base"
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline} />
              </div>
            </div>

            <input type="submit" className="mt-2 btn btn-wide btn-sm" value='更新する'/>
          </form>
        </div>

        
        <div className="flex gap-4">
          <button className="btn btn-xs btn-outline btn-square" onClick={() => setIsEdit(false)}>
            <span className="icon-[weui--previous-filled] size-5"></span>
          </button>

          {/* DELETEボタンの場所の穴埋め */}
          <span className="size-5"></span>
        </div>
      </li>
    </>
  )
}