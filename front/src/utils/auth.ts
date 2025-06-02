import { clientCredentials } from "./axios"

// 認証トークンを送信し、ログイン状態を確認する
export const checkAuth = async() => {
  try {
    const res = await clientCredentials.get('/auth/check');
    console.log(res.data);
  } catch(error) {
    console.log('エラー：', error);
  }
}
