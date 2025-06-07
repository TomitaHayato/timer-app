import { useForm } from "react-hook-form"
import FormErrorText from "./FormErrorText"
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { selectSessionError, selectSessionLoading, signup } from "../slices/sessionSlice";
import type { SignupParams } from "../types/session";
import { LoadingSpans } from "../../../components/btn/LoadingSpans";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";

export function SignupForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignupParams>();
  // redux
  const dispatch = useAppDispatch();
  const sessionError: string | null = useAppSelector(selectSessionError);
  const loading: boolean = useAppSelector(selectSessionLoading);

  const onSubmit = async (data: SignupParams) => {
    console.log('Signup Formデータ', data);
    try{
      await dispatch(signup(data)).unwrap;
      reset();
      toastSuccessRB('新規登録 完了しました')
     } catch {
      toastErrorRB('新規登録に失敗しました')
     }
  }

  return(
    <>
      <fieldset className="fieldset rounded-box w-full p-4">
        <legend className="fieldset-legend text-2xl">Signup</legend>

        <form onSubmit={handleSubmit(onSubmit)}>
          { sessionError && <p className="text-error text-center text-lg font-semibold">{sessionError}</p>  }
          <label className="label">Name</label>
          <FormErrorText errorText={ errors.name?.message }/>
          <input type="text" className="input w-full" placeholder="name"
            { ...register('name', { required: '！名前を入力してください', }) }
            />

          <label className="label">Email</label>
          { errors.email?.message && <FormErrorText errorText={ errors.email.message }/> }
          <input type="email" className="input w-full" placeholder="email"
            { ...register('email', { required: '！メールアドレスを入力してください', }) }
            />

          <label className="label">Password</label>
          <FormErrorText errorText={ errors?.password?.message }/>
          <input type="password" className="input w-full" placeholder="password"
            { ...register('password', {
              required: '！パスワードを入力してください',
              minLength: {
                value: 4,
                message: '！パスワードは4文字以上で設定してください',
              }})
            }
            />

          <label className="label">PasswordConfirmation</label>
          <FormErrorText errorText={ errors?.passwordConfirmation?.message }/>
          <input type="password" className="input w-full" placeholder="password confirmation"
            { ...register('passwordConfirmation', {
              required: '！パスワードを再入力してください',
              minLength: {
                value: 4,
                message: '！パスワードは4文字以上で設定してください',
              }
            })}
            />

          {
            loading
            ? <button className="btn btn-info btn-block mt-4"><LoadingSpans /></button>
            : <input type="submit" className="btn btn-info btn-block mt-4" value={"新規登録"}/>
          }
        </form>
      </fieldset>
    </>
  )
}