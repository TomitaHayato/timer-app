import { useAppSelector } from "../../../reduxStore/hooks";
import { clientCredentials } from "../../../utils/axios";
import { devLog } from "../../../utils/logDev";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast"
import { selectAuthStatus } from "../../session/slices/sessionSlice";

export function UserDeleteBtn() {
  const isAuth = useAppSelector(selectAuthStatus);

  const handleClick = async() => {
    if(!isAuth) return;

    const confirm = window.confirm('本当にユーザー情報を削除しますか？\n削除したデータは復元できません。')
    if (!confirm) return;

    try {
      const res = await clientCredentials.delete('/users');
      devLog(res)
      toastSuccessRB('ユーザー情報を削除しました')
    } catch {
      toastErrorRB('ユーザー情報の削除に失敗しました');
    }
  }

  return(
    <>
      <button className="btn btn-wide btn-error" onClick={handleClick} disabled={!isAuth}>
        ユーザー情報削除
      </button>
    </>
  )
}