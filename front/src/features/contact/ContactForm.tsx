import { useForm } from "react-hook-form";
import type { ContactFormParams } from "../../types/contact";
import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { selectContactState, sendContact } from "./contactSlice";
import { toastErrorRB, toastSuccessRB } from "../../utils/toast";
import FormErrorText from "../auth/components/FormErrorText";
import { closeModal } from "../../utils/modelCtl";
import { LoadingBtn } from "../../components/btn/LoadingBtn";

type Props = {
  modalId: string,
}

export const ContactForm = ({ modalId }: Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormParams>();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectContactState);

  const onSubmit = async(params: ContactFormParams) => {
    try {
      await dispatch(sendContact(params)).unwrap();
      reset();
      toastSuccessRB('お問い合わせ内容を送信しました');
    } catch {
      toastErrorRB('お問い合わせ内容を送信できませんでした');
    } finally {
      closeModal(modalId);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">

          <p>ご用件</p>
          <FormErrorText errorText={ errors.subject?.message }/>
          <select
            className="select mb-6"
            {...register('subject', { required: "件名を入力してください" })}>
            <option value="ご質問">ご質問</option>
            <option value="不具合・バグ">不具合・バグのご報告</option>
            <option value="その他">その他</option>
          </select>

          <p className="mb-2">返信は必要ですか？</p>
          <div className="flex gap-12 mb-6">
            <label>
              <input type="radio" value="false" className="radio" {...register("reply")} />
              不要
            </label>

            <label>
              <input type="radio" value="true" className="radio" {...register("reply")}/>
              必要
            </label>
          </div>

          <p>本文</p>
          <FormErrorText errorText={ errors.body?.message }/>
          <textarea
            className="textarea min-h-60 mb-6"
            {...register('body', { required: "本文を入力してください" })}/>
          
          {
            loading
            ? <LoadingBtn className="btn btn-wide btn-info" />
            : <input
              type="submit"
              className="btn btn-wide btn-info"/>
          }
        </form>
      </div>
    </>
  )
}
