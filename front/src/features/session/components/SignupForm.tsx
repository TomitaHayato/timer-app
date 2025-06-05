import { useForm } from "react-hook-form"
import FormErrorText from "./FormErrorText"
import { clientCredentials } from "../../../utils/axios"
import { useState } from "react";

type FormParams = {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

export function SignupForm() {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormParams>();
  // ログインに成功したかどうか
  const [ isFailed, setIsFailed ] = useState<boolean>(false);

  const onSubmit = async (data: FormParams) => {
    try {
      console.log('送信データ', data);
      const res = await clientCredentials.post('/auth/signup', data);
      console.log('レスポンスデータ', res.data);
      setIsFailed(false);
    } catch {
      setIsFailed(true);
      console.log('新規登録に失敗しました');
    }
  }

  return(
    <>
      <fieldset className="fieldset rounded-box w-full p-4">
        <legend className="fieldset-legend text-2xl">Signup</legend>

        <form onSubmit={handleSubmit(onSubmit)}>
          { isFailed && <p className="text-error text-center text-lg font-semibold">新規登録に失敗しました</p>  }
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

          <input type="submit" className="btn btn-info btn-block mt-4" value={"新規登録"}/>
        </form>
      </fieldset>
    </>
  )
}