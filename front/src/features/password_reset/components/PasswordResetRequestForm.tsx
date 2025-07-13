import { useForm } from "react-hook-form"
import { toastSuccessRB } from "../../../utils/toast";
import { closeModal } from "../../../utils/modelCtl";
import { devLog } from "../../../utils/logDev";
import type { passwordForgetParams } from "../types/password_reset";
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { fetchPasswordResetRequest, selectPasswordResetLoading } from "../redux/passwordResetSlice";

export const PasswordResetRequestForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<passwordForgetParams>();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectPasswordResetLoading);

  const fetchResetRequest = async(data: passwordForgetParams) => {
    // パスワードの総当たりで登録メールアドレスを推測されないよう、成功・失敗に関わらず同じメッセージを表示
    toastSuccessRB('パスワードリセット申請用メールを送信しました');
    try {
      await dispatch(fetchPasswordResetRequest(data));
    } catch(err) {
      devLog('パスワードリセットの申請に失敗しました', err);
    } finally {
      closeModal('password-reset-form');
      closeModal('login-form');
      reset();
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
          className="btn btn-primary"
          disabled={isLoading}/>
      </form>
    </div>
  )
}
