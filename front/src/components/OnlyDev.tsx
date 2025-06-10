import { clientCredentials } from "../utils/axios";
import { useAppSelector } from "../reduxStore/hooks";
import { selectAuthStatus } from "../features/session/slices/sessionSlice";
import { devLog } from "../utils/logDev";

export default function OnlyDev() {
  const isAuth = useAppSelector(selectAuthStatus);

  if (!import.meta.env.DEV) return;

  // 認証状態をAPIに確認
  const checkAuth = async() => {
    try {
      const res = await clientCredentials.get('/auth/check');
      devLog('検証結果：', res.data);
    } catch {
      devLog('検証失敗')
    }
  }

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
      <button className="text-center btn btn-primary" onClick={
        checkAuth
      }>確認用ボタン A</button>
      { isAuth &&
        <button className="text-center btn btn-primary" onClick={
          deleteUser
        }>ユーザー削除</button>
      }
    </>
  )
}