import dayjs from "dayjs";
import { dbQueryHandler } from "../models/utils/queryErrorHandler";
import { generateRandomToken } from "../utils/token";
import { dataHash, hashCompare } from "../utils/dataHash";
import { createPasswordResetToken, getPasswordResetTokenById } from "../models/passwordResetToken/passwordResetToken.model";
import { devLog } from "../utils/dev/devLog";
import { checkExpire } from "../utils/date";

export const createPasswordResetTokenFromUserId = async(userId: string) => {
  const token = generateRandomToken();
  const hashedToken = await dataHash(token);
  const tokenExpiredIn = dayjs().add(30, 'minutes').toDate(); // 有効期限は30分

  return {
    passwordResetToken: await dbQueryHandler(createPasswordResetToken, { userId, hashedToken, tokenExpiredIn }),
    token,
  }
}


// トークンの有効性を検証（DBに存在 + トークンが一致 + 期限が有効）
export const verifyPasswordResetToken = async(id: string, token: string) => {
  try {
    // tokenの存在Check
    const passwordResetTokenInDB = await dbQueryHandler(getPasswordResetTokenById, id);
    if (!passwordResetTokenInDB) {
      devLog('passwordResetTokenが見つかりません');
      return false; // トークンが存在しない場合、false
    }

    // TokenがDBと一致するか
    if (!hashCompare(token, passwordResetTokenInDB.hashedToken)) {
      devLog('passwordResetTokenが異なります');
      return false;
    }

    // Tokenの有効期限
    if (!checkExpire(passwordResetTokenInDB.tokenExpiredIn)) {
      devLog('passwordResetTokenが失効しています');
      return false;
    }

    devLog('passwordResetTokenは有効です');
    return passwordResetTokenInDB;
  } catch(err) {
    devLog('verifyPasswordResetTokenのエラー', err);
    throw Error();
  }
}