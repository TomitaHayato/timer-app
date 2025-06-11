import { clientCredentials } from "../utils/axios";
import { useAppSelector } from "../reduxStore/hooks";
import { selectAuthStatus } from "../features/session/slices/sessionSlice";
import { devLog } from "../utils/logDev";

export default function OnlyDev() {
  const isAuth = useAppSelector(selectAuthStatus);

  if (!import.meta.env.DEV) return;

  const deleteUser = async() => {
    try {
      const res = await clientCredentials.delete(`/users`);
      devLog('検証結果：', res.data);
    } catch {
      devLog('検証失敗')
    }
  }

  return(
    <>
      { isAuth &&
        <button className="text-center btn btn-primary" onClick={
          deleteUser
        }>ユーザー削除</button>
      }
    </>
  )
}