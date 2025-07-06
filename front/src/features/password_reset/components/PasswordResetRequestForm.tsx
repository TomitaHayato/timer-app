import { useForm } from "react-hook-form"
import { clientCredentials } from "../../../utils/axios";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { closeModal } from "../../../utils/modelCtl";

export const PasswordResetRequestForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<{ email: string }>();

  const fetchResetRequest = async() => {
    try {
      toastSuccessRB('パスワードリセット申請用メールを送信しました');
      // await clientCredentials.get(''); // パスワードリセット申請メールの送信エンドポイント
      closeModal('password-reset-form');
      closeModal('login-form');
      reset();
    } catch {
      toastErrorRB('パスワードリセットの申請に失敗しました')
    }
  }

  return(
    <div className="py-8">
      <p className="text-gray-300 mb-8">
        パスワードを再生成するアカウントのメールアドレスを入力してください。
        パスワードリセット用URLが送信されます
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(fetchResetRequest)}>
        <label>
          メールアドレス
          {
            errors?.email?.message &&
            <p className="text-error text-sm">{ errors.email.message }</p>
          }
          <input
            type="email"
            className="input w-full"
            { ...register('email', { required: "メールアドレスを入力してください" }) }/>
        </label>

        <input
          type="submit"
          className="btn btn-primary"/>
      </form>
    </div>
  )
}
