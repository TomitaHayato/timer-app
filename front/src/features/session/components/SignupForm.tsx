import { useForm } from "react-hook-form"
import FormErrorText from "./FormErrorText"

type formParams = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
}

export function SignupForm() {
  const { register, handleSubmit, formState: { errors }, } = useForm()

  const onSubmit = (data: formParams) => {
    console.log(data)
  }

  return(
    <>
      <fieldset className="fieldset rounded-box w-full p-4">
        <legend className="fieldset-legend text-2xl">Signup</legend>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">Name</label>
          <FormErrorText errorText={errors?.name?.message}/>
          <input type="text" className="input w-full" placeholder="name"
            { ...register('name', { required: '！名前を入力してください', }) }
            />

          <label className="label">Email</label>
          <FormErrorText errorText={errors?.email?.message}/>
          <input type="email" className="input w-full" placeholder="email"
            { ...register('email', { required: '！メールアドレスを入力してください', }) }
            />

          <label className="label">Password</label>
          <FormErrorText errorText={errors?.password?.message}/>
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
          <FormErrorText errorText={errors?.password_confirmation?.message}/>
          <input type="password" className="input w-full" placeholder="password_confirmation"
            { ...register('password_confirmation', {
              required: '！パスワードを再入力してください',
              minLength: {
                value: 4,
                message: '！パスワードは4文字以上で設定してください',
              }
            })}
            />

          <input type="submit" className="btn btn-info btn-block mt-4"/>
        </form>
      </fieldset>
    </>
  )
}