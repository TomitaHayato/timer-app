import { useState } from "react";
import { clientCredentials } from "../utils/axios";

export default function OnlyDev() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  if (!import.meta.env.DEV) return;

  // 認証状態をAPIに確認
  const checkAuth = async() => {
    try {
      const res = await clientCredentials.get('/auth/check');
      console.log('検証結果：', res.data);
      setIsAuth(true)
    } catch {
      console.log('検証失敗')
      setIsAuth(false)
    }
  }

  const logout = async() => {
    try {
      const res = await clientCredentials.get('/auth/signout');
      console.log('検証結果：', res.data);
      setIsAuth(false);
    } catch {
      console.log('検証失敗')
    }
  }

  const deleteUser = async() => {
    try {
      const res = await clientCredentials.delete(`/users`);
      console.log('検証結果：', res.data);
      setIsAuth(false);
    } catch {
      console.log('検証失敗')
    }
  }

  // TODOSにアクセス
  const reqTodosAPI = async() => {
    try {
      const res = await clientCredentials.get('/todos');
      console.log('レスポンスデータ：', res.data);
    } catch(e) {
      console.log('失敗', e)
    }
  }

  return(
    <>
      <button className="text-center btn btn-primary" onClick={
        checkAuth
      }>確認用ボタン A</button>
      { isAuth &&
        <button className="text-center btn btn-primary" onClick={
          logout
        }>ログアウト</button>
      }
      { isAuth &&
        <button className="text-center btn btn-primary" onClick={
          deleteUser
        }>ユーザー削除</button>
      }
    </>
  )
}