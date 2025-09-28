import { useAppSelector } from "../../../reduxStore/hooks";
import { selectUser } from "../../auth/slices/authSlice";

type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

export function ProfileContent({ setIsEdit }: Props) {
  const user = useAppSelector(selectUser);
  if(!user) return;

  function handleEditClick() {
    setIsEdit(true);
  }

  return(
    <>
      <div data-testid="profile-content">
        <div className="flex justify-center items-center mb-8">
          <h3 className="text-xl font-semibold">プロフィール</h3>
          <button onClick={handleEditClick}><span className="btn  icon-[line-md--edit-full-filled] size-6"></span></button>
        </div>

        <div className="w-5/12 mx-auto">
          {/* 名前 */}
          <div className="mb-4">
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-lg">{ user.name }</p>
          </div>
          {/* メールアドレス */}
          <div className="mb-4">
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg">{ user.email }</p>
          </div>
        </div>
      </div>
    </>
  )
}