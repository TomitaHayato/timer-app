import dayjs from "dayjs";
import { dbQueryHandler } from "../models/utils/queryErrorHandler";
import { createRefreshToken, getRefreshTokenByUserId, updateRefreshToken } from "../models/authRefreshToken/authRefreshToken";
import { devLog } from "../utils/dev/devLog";
import { makeRefreshToken } from "../utils/refreshToken";

export const createNewRefreshToken = async(userId: string) => {
  const token = makeRefreshToken();
  const expiresAt = dayjs().add(14, 'day').toDate(); // 期限を2週間後に設定
  const newToken = await dbQueryHandler(createRefreshToken, { userId, token, expiresAt });
  devLog('新規作成したauthRefreshToken', newToken);
  return newToken;
}

// userIdで指定したrefreshTokenのtoken, expiresAtを更新
export const refreshRefreshToken = async(userId: string) => {
  const newToken = makeRefreshToken();
  const expiresAt = dayjs().add(14, 'day').toDate(); // 期限を2週間後に設定
  return await dbQueryHandler(updateRefreshToken, { userId, newToken, expiresAt })
}

// 既存のレコードがあれば更新、なければ作成
export const createOrUpdateRefreshToken = async(userId: string) => {
  const tokenNow = await dbQueryHandler(getRefreshTokenByUserId, userId);

  if(!tokenNow) {
    // 既存のトークンがない場合、新規作成
    return await createNewRefreshToken(userId);
  } else {
    // 既存のトークンがある場合、更新
    return await refreshRefreshToken(userId);
  }
}