import { isAxiosError } from "axios";
import { clientCredentials } from "../axios";
import { devLog } from "../logDev";
import { ACCESS_TOKEN_EXPIRE_ERROR, INVALID_REFRESH_TOKEN } from "../apiErrors/errorMessages";
import type { httpMethod } from "../../types/http";

// 認可が必要なエンドポイントにリクエストする際、期限切れのJWTに対して認証トークンのリフレッシュを行う
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
    // Accessトークンが期限切れの場合、トークンのリフレッシュエンドポイントにアクセス
    if (isAxiosError(e) && e.response?.data?.error === ACCESS_TOKEN_EXPIRE_ERROR) {
      try {
        const resFromTokenRefresh = await clientCredentials.post('/auth/token_refresh');
        if(!resFromTokenRefresh) {
          devLog('/auth/token_refreshのレスポンスがない');
          throw new Error();
        }
        devLog('tokenのリフレッシュ完了');
        devLog('/auth/token_refreshのResponse', resFromTokenRefresh);

        // もう一度、目的のエンドポイントを叩く
        const res = await clientCredentials.request({
          url,
          method,
          data,
          ...option
        });
        return res;
      } catch(e) {
        if (isAxiosError(e) && e.response?.data?.error === INVALID_REFRESH_TOKEN) {
          devLog('RefreshTokenが無効');
          throw new Error(INVALID_REFRESH_TOKEN);
        }
        throw new Error();
      }
    } else {
      throw new Error(); // 期限切れ以外の場合、外側のcatch節にエラーを伝搬
    }
  }
}
