import { useForm } from "react-hook-form"
import FormErrorText from "./FormErrorText"

type formParams = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
}

export function LoginForm() {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  
  const onSubmit = (data: formParams) => {
    console.log(data)
  }

  return(
    <>
      <fieldset className="fieldset rounded-box w-full p-4">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">Email</label>
          <FormErrorText errorText={errors.email?.message}/>
          <input type="email" className="input w-full" placeholder="Email"
            {...register('email', {required: '！メールアドレスを入力してください'})}
            />

          <label className="label">Password</label>
          <FormErrorText errorText={errors.password?.message}/>
          <input type="password" className="input w-full" placeholder="Password"
            {...register('password', {required: '！パスワードを入力してください'})}
            />

          <input type="submit" className="btn btn-success btn-block mt-4" />
        </form>
      </fieldset>
    </>
  )
}
