import dayjs from "dayjs";
import { NewUserPostParams, User } from "../types/user";
import { makeRefreshToken } from "../utils/refreshToken";
import { dbQueryHandler } from "../models/utils/queryErrorHandler";
import { devLog } from "../utils/dev/devLog";
import { createNewUser } from "../models/users/users";

export const createNewUserWithRelationRecords = async(params: NewUserPostParams): Promise<User> => {
  // refreshToken用の値
  const token = makeRefreshToken();
  const expiresAt = dayjs().add(14, 'day').toDate(); // 期限を2週間後に設定
  // 作成処理
  const newRecord = await dbQueryHandler(createNewUser, params, token, expiresAt);
  // 作成したレコードを返す
  devLog('作成されたUserと関連:', newRecord);
  return newRecord;
}