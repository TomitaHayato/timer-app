import dayjs from "dayjs";
import { dbQueryHandler } from "../models/utils/queryErrorHandler";
import { createRefreshToken, getRefreshTokenByUserId, updateRefreshToken } from "../models/authRefreshToken/authRefreshToken";
import { devLog } from "../utils/dev/devLog";
import { makeRefreshToken } from "../utils/refreshToken";
import { AuthRefreshToken } from "../types/authRefreshToken";

export const createNewRefreshToken = async(userId: string): Promise<AuthRefreshToken> => {
  const token = makeRefreshToken();
  const expiresAt = dayjs().add(14, 'day').toDate(); // 期限を2週間後に設定
  const newToken = await dbQueryHandler(createRefreshToken, { userId, token, expiresAt });
  devLog('新規作成したauthRefreshToken', newToken);
  return newToken;
}

// userIdで指定したrefreshTokenのtoken, expiresAtを更新
export const refreshRefreshToken = async(userId: string): Promise<AuthRefreshToken> => {
  const newToken = makeRefreshToken();
  const expiresAt = dayjs().add(14, 'day').toDate(); // 期限を2週間後に設定
  return await dbQueryHandler(updateRefreshToken, { userId, newToken, expiresAt })
}

export const createOrUpdateRefreshToken = async(userId: string): Promise<AuthRefreshToken> => {
  const existingToken = await dbQueryHandler(getRefreshTokenByUserId, userId);

  // 既存のトークンがある場合、更新
  if (existingToken) return await refreshRefreshToken(userId);

  // 既存のトークンがない場合、新規作成
  return await createNewRefreshToken(userId);
}
