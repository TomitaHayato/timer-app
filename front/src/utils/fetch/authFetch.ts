import { isAxiosError } from "axios";
import { clientCredentials } from "../axios";
import { devLog } from "../logDev";
import { ACCESS_TOKEN_EXPIRE_ERROR, INVALID_REFRESH_TOKEN } from "../apiErrors/errorMessages";
import type { httpMethod } from "../../types/http";

type RequestOptions = {
  url: string,
  method: httpMethod,
  data?: object,
  option?: object,
  csrfToken?: string,
}

// POSTリクエストの場合のみ、CSRF_TOKENを添付してリクエスト送信
const _fetchHandlingCsrf = async(requestOptions: RequestOptions) => {
  const { url, method, data, option, csrfToken } = requestOptions;

  if (method !== "post") {
    return await clientCredentials().request({
      url,
      method,
      data,
      ...option
    });
  } else {
    return clientCredentials({ "X-CSRF-TOKEN": csrfToken }).request({
      url,
      method,
      data,
      ...option
    });
  }
}

// 認可が必要なエンドポイントを叩く際、期限切れのJWTに対して認証トークンのリフレッシュを行う
export const authFetch = async(url: string, method: httpMethod, data?: object, option?: object, csrfToken?: string) => {
  try {
    return await _fetchHandlingCsrf({
      url,
      method,
      data,
      option,
      csrfToken
    });
  } catch(e) {
    // Accessトークンが期限切れの場合、トークンのリフレッシュエンドポイントにアクセス
    if (isAxiosError(e) && e.response?.data?.error === ACCESS_TOKEN_EXPIRE_ERROR) {
      try {
        // リフレッシュトークン検証エンドポイントを叩く
        await clientCredentials().post('/auth/token_refresh');
        devLog('tokenのリフレッシュ完了');

        // もう一度、目的のエンドポイントを叩く
        return await _fetchHandlingCsrf({
          url,
          method,
          data,
          option,
          csrfToken,
        });
      } catch(e) {
        if (isAxiosError(e) && e.response?.data?.error === INVALID_REFRESH_TOKEN) {
          devLog('RefreshTokenが無効');
          throw new Error(INVALID_REFRESH_TOKEN);
        }

        throw new Error();
      }
    } else {
      throw new Error(); // 認証トークンの期限切れ以外 => 外にエラーを伝播
    }
  }
}
