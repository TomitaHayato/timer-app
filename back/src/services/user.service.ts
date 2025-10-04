import dayjs from "dayjs";
import { NewUserPostParams, User } from "../types/user";
import { makeRefreshToken } from "../utils/refreshToken";
import { dbQueryHandler } from "../models/utils/queryErrorHandler";
import { devLog } from "../utils/dev/devLog";
import { createNewUser } from "../models/users/users";
import { generateCsrfTokenAuto } from "../middlewares/utils/csrf";
import { CsrfInfo } from "../types/csrf";

export const createNewUserWithRelationRecords = async(params: NewUserPostParams): Promise<{ user: User, refreshToken: string, csrfToken: string }> => {
  // refreshToken用の値
  const token = makeRefreshToken();
  const expiresAt = dayjs().add(14, 'day').toDate(); // 期限を2週間後に設定
  // csrf用
  const csrfInfo: CsrfInfo = await generateCsrfTokenAuto();
  // 作成処理
  const user = await dbQueryHandler(createNewUser, { params, token, expiresAt, csrfSecret: csrfInfo.secret });
  // 作成したレコードを返す
  devLog('作成されたUserと関連:', user);
  return {
    user,
    refreshToken: token,
    csrfToken: csrfInfo.csrfToken,
  }
}
