import type { Todo, TodoAddParams, TodoUpdateParams } from "../../../types/todoType"
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react"
import { useAppDispatch } from "../../../reduxStore/hooks"
import { updateTodo } from "../todoSlice"
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast"
import { DayPickerForm } from "./DayPickerForm"

type Props = {
  todo: Todo,
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

// Todoの編集モード
export function TodoItemEditForm({ todo, setIsEdit }: Props) {
  const dispatch = useAppDispatch();

  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TodoAddParams>({
    defaultValues: { title: '' }
  });

  useEffect(() => {
    reset({ title: todo.title });
  }, [todo, reset])

  const fetchUpdateTodo = async(data: { title: string }) => {
    const params: TodoUpdateParams = {
      ...data,
      id: todo.id,
    }
    try {
      await dispatch(updateTodo({ params }));
      toastSuccessRB('Todoを更新しました');
      setIsEdit(false)
    } catch {
      toastErrorRB('Todoの更新に失敗しました')
    }
  }

  return(
    <>
      <li className="flex justify-center gap-2 items-center px-2 py-2 mb-1 text-sm bg-gray-600">
        <div className="min-w-10/12 text-center">
          <form onSubmit={handleSubmit(fetchUpdateTodo)}>
            { errors?.title?.message && <p className="text-xs text-error">{errors.title.message}</p> }
            <textarea
              className="textarea"
              { ...register('title', {
                required: '※タイトルを入力してください',
                maxLength: {
                  value: 255,
                  message: "255文字以内で入力してください",
                }
              })}/>

            <div className="flex justify-start mt-0.5">
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <DayPickerForm field={field} />
                )}
              />
            </div>

            <input type="submit" className="my-2 btn btn-primary btn-wide btn-sm" value='更新する'/>
          </form>
        </div>

        
        <button className="btn btn-xs btn-outline btn-square" onClick={() => setIsEdit(false)}>
          <span className="icon-[weui--previous-filled] size-5"></span>
        </button>
      </li>
    </>
  )
}