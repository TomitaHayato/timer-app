import { isAxiosError } from "axios";
import { clientCredentials } from "../axios";
import { devLog } from "../logDev";
import { ACCESS_TOKEN_EXPIRE_ERROR } from "../apiErrors/errorMessages";
import type { httpMethod } from "../../types/http";

export const fetchWithTokenRefresh = async(url: string, method: httpMethod, data?: object, option?: object) => {
  try {
    const res = await clientCredentials.request({
      url,
      method,
      data,
      ...option
    });
    devLog(`${url}のリクエスト結果:`, res)
    return res;
  } catch(e) {
    devLog('/auth/checkでエラー:', e)
    if (isAxiosError(e) && e.response?.data?.error === ACCESS_TOKEN_EXPIRE_ERROR) {
      // トークンが期限切れの場合、認証トークンのリフレッシュエンドポイントにアクセス
      const resFromTokenRefresh = await clientCredentials.post('/auth/token_refresh');
      if(!resFromTokenRefresh) {
        devLog('/auth/token_refreshのレスポンスがない');
        throw new Error();
      }
      devLog('tokenのリフレッシュ完了');
      
      devLog('/auth/token_refreshのResponst', resFromTokenRefresh);
      // もう一度、目的のエンドポイントを叩く
      const res = await clientCredentials.request({
        url,
        method,
        data,
        ...option
      });
      return res;
    } else {
      throw new Error(); // 期限切れ以外の場合、外側のcatch節にエラーを伝搬
    }
  }
}
