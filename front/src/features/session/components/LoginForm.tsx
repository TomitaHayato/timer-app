import { useForm } from "react-hook-form"
import FormErrorText from "./FormErrorText"
import type { SigninParams } from "../types/session";
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { selectSessionError, selectSessionLoading, signin } from "../slices/sessionSlice";
import { LoadingSpans } from "../../../components/btn/LoadingSpans";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";

export function LoginForm() {
  // form
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SigninParams>();
  // redux
  const dispatch = useAppDispatch();
  const sessionError: string | null = useAppSelector(selectSessionError);
  const loading: boolean = useAppSelector(selectSessionLoading);
  
  const onSubmit = async (data: SigninParams) => {
    if (loading) return
    console.log('Signin Formデータ：', data);
    try {
      // unwrapでAsynkThunkの成功・失敗をキャッチ
      await dispatch(signin(data)).unwrap();
      reset();
      toastSuccessRB('ログインしました')
    } catch {
      toastErrorRB('ログイン失敗')
    }
  }

  return(
    <>
      <fieldset className="fieldset rounded-box w-full p-4">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <form onSubmit={handleSubmit(onSubmit)}>
          { sessionError && <p className="text-error text-center text-lg font-semibold">{sessionError}</p> }

          <label className="label">Email</label>
          <FormErrorText errorText={ errors.email?.message }/>
          <input type="email" className="input w-full" placeholder="Email"
            {...register('email', {required: '！メールアドレスを入力してください'})}
            />

          <label className="label">Password</label>
          <FormErrorText errorText={errors.password?.message}/>
          <input type="password" className="input w-full" placeholder="Password"
            {...register('password', {required: '！パスワードを入力してください'})}
            />

          {
            loading
            ? <button className="btn btn-success btn-block mt-4"><LoadingSpans /></button>
            : <input type="submit" className="btn btn-success btn-block mt-4" value={"ログイン"} /> 
          }
        </form>
      </fieldset>
    </>
  )
}
