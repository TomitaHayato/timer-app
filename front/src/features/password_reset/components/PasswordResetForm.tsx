import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { fetchUpdateUserPassword, selectPasswordResetState } from "../redux/passwordResetSlice";

type FormParams = {
  password: string,
  passwordConfirmation: string,
}

type Props = {
  id: string,
  token: string,
}

export function PasswordResetForm({ id, token }: Props) {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(selectPasswordResetState);
  const { register, handleSubmit, formState: { errors } } = useForm<FormParams>();

  const fetchPasswordUpdate = async(data: FormParams) => {
    const params = {
      ...data,
      id,
      token,
    }
    dispatch(fetchUpdateUserPassword(params));
  }

  return(
    <>
      <div>
        <form onSubmit={handleSubmit(fetchPasswordUpdate)} className="flex flex-col mt-16 gap-8 items-center">
          <h3 className="text-2xl font-semibold">パスワード再設定フォーム</h3>

          <label className="min-w-1/4">
            新しいパスワード
            { errors?.password?.message && <p className="text-error text-sm">{errors.password.message}</p> }
            <input
              type="password"
              className="input"
              { ...register('password', { required: '※パスワードを入力してください', min: 6 }) }/>
          </label>
          
          <label className="min-w-1/4">
            パスワード確認
            { errors?.passwordConfirmation?.message && <p className="text-error text-sm">{errors.passwordConfirmation.message}</p> }
            <input
              type="password"
              className="input"
              { ...register('passwordConfirmation', { required: '※パスワード確認を入力してください', min: 6 }) }/>
          </label>
          
          <input
            className="btn btn-wide btn-primary"
            type="submit"
            disabled={loading} />
        </form>
      </div>
    </>
  )
}