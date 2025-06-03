import { clientCredentials } from "../utils/axios";

export default function OnlyDev() {
  if (!import.meta.env.DEV) return;

  // 認証状態をAPIに確認
  const checkAuth = async() => {
    try {
      const res = await clientCredentials.get('/auth/check');
      console.log('検証結果：', res.data);
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
        reqTodosAPI
      }>確認用ボタン</button>
    </>
  )
}