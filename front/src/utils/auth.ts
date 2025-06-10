import { clientCredentials } from "./axios"
import { devLog } from "./logDev";

// 認証トークンを送信し、ログイン状態を確認する
export const checkAuth = async() => {
  try {
    const res = await clientCredentials.get('/auth/check');
    devLog(res.data);
  } catch(error) {
    devLog('エラー：', error);
  }
}
