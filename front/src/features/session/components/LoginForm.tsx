import { useForm } from "react-hook-form"
import FormErrorText from "./FormErrorText"
import { clientCredentials } from "../../../utils/axios"
import { useState } from "react";

type FormParams = {
  email: string,
  password: string,
}

export function LoginForm() {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormParams>();
  // ログインに成功したかどうか
  const [ isFailed, setIsFailed ] = useState<boolean>(false);
  
  const onSubmit = async (data: FormParams) => {
    console.log('送信データ：', data);
    try {
      const res = await clientCredentials.post('/auth/signin', data);
      console.log('レスポンス：', res.data);
      setIsFailed(false);
    } catch {
      console.error('ログインに失敗しました');
      setIsFailed(true);
    }
  }

  return(
    <>
      <fieldset className="fieldset rounded-box w-full p-4">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <form onSubmit={handleSubmit(onSubmit)}>
          { isFailed && <p className="text-error text-center text-lg font-semibold">ログインに失敗しました</p> }

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

          <input type="submit" className="btn btn-success btn-block mt-4" value={"ログイン"} />
        </form>
      </fieldset>
    </>
  )
}
