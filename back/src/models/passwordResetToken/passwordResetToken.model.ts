import dayjs from "dayjs";
import { PrismaClient } from "../../../generated/prisma"
import { devLog } from "../../utils/dev/devLog";
import { dbQueryHandler } from "../utils/errorHandler";
import { checkExpire } from "../../utils/date";

export const createPasswordResetTokenByUserId = async(prisma: PrismaClient, queryInfo: { userId: string, hashedToken: string }) => {
  const { userId, hashedToken } = queryInfo;
  const tokenExpiredIn = dayjs().add(30, 'minutes').toDate(); // 有効期限は1時間

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      tokenExpiredIn,
      hashedToken,
      userId,
    }
  })
  devLog('passwordResetTokenを作成：', passwordResetToken);
  return passwordResetToken;
}

export const deletePasswordResetToken = async(prisma: PrismaClient, queryInfo: { userId: string }): Promise<void> => {
  const { userId } = queryInfo;

  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: userId
    },
  });
  devLog('passwordResetTokenを削除しました');
}

export const getPasswordResetTokenByToken = async(prisma: PrismaClient, hashedToken: string) => {
  const token = await prisma.passwordResetToken.findFirst({
    where: { hashedToken }
  });

  devLog('passwordResetTokenを取得：', token);
  return token
}

// 指定されたトークンが有効かどうか検証
export const verifyPasswordResetToken = async(hashedToken: string) => {
  try {
    const passwordResetToken = await dbQueryHandler(getPasswordResetTokenByToken, hashedToken);
    if (!passwordResetToken) {
      devLog('passwordResetTokenが見つかりません');
      return false; // トークンが存在しない場合、false
    }

    // トークンが失効している場合
    if (!checkExpire(passwordResetToken.tokenExpiredIn)) {
      devLog('passwordResetTokenが失効しています');
      return false;
    }

    devLog('passwordResetTokenは有効です');
    return true;
  } catch(err) {
    devLog('verifyPasswordResetTokenのエラー', err);
    throw Error();
  }
}
