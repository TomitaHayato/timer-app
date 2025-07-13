import { clientCredentials } from "../axios"
import { devLog } from "../logDev";

// 認証トークン検証エンドポイントにfetchし、ログイン状態を確認
export const checkAuth = async() => {
  try {
    const res = await clientCredentials.get('/auth/check');
    devLog(res.data);
  } catch(error) {
    devLog('エラー：', error);
  }
}
