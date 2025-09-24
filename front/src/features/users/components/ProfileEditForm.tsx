import { useForm } from "react-hook-form"
import type { User } from "../../../types/session";
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { selectUser, updateUser } from "../../session/slices/sessionSlice";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { devLog } from "../../../utils/logDev";

type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

export function ProfileEditForm({ setIsEdit }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  if(!user) return;

  function handleEditClick() {
    setIsEdit(false);
  }

  const fetchUserUpdate = async(data: User) => {
    devLog('送信データ', data);
    try {
      // user更新リクエストをfetchし、ステートを更新
      await dispatch(updateUser(data)).unwrap();
      toastSuccessRB('プロフィールを更新しました');
      setIsEdit(false);
    } catch {
      toastErrorRB('プロフィール更新に失敗しました');
    }
  }

  return(
    <>
      <div data-testid="profile-edit-form">
        <div className="flex justify-center items-center mb-8">
          <h3 className="text-xl font-semibold">プロフィール</h3>
          <button onClick={handleEditClick}><span className="btn text-gray-400 icon-[weui--previous-filled] size-6"></span></button>
        </div>

        <form onSubmit={handleSubmit(fetchUserUpdate)} className="w-7/12 mx-auto">
          {/* 名前 */}
          <div className="mb-4">
            <p className="text-sm text-gray-400">Name</p>
            { errors?.name?.message && <p className="text-error text-sm">{errors.name.message}</p> }
            <input
              type="text"
              className="input"
              defaultValue={user.name}
              {...register('name', { required: '名前を入力してください' })}/>
          </div>
          {/* メールアドレス */}
          <div className="mb-4">
            <p className="text-sm text-gray-400">Email</p>
            { errors?.email?.message && <p className="text-error text-sm">{errors.email.message}</p> }
            <input
              type="email"
              className="input"
              defaultValue={user.email}
              {...register('email', { required: 'メールアドレスを入力してください' })}/>
          </div>
          <div>
            <input type="submit" className="btn btn-primary w-full" value="更新"/>
          </div>
        </form>
      </div>
    </>
  )
}
