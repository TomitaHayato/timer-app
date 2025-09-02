import dayjs from "dayjs";
import { PrismaClient } from "../../../generated/prisma"
import { devLog } from "../../utils/dev/devLog";
import { dbQueryHandler } from "../utils/queryErrorHandler";
import { checkExpire } from "../../utils/date";
import { hashCompare } from "../../utils/dataHash";

export const createPasswordResetTokenByUserId = async(prisma: PrismaClient, queryInfo: { userId: string, hashedToken: string }) => {
  const { userId, hashedToken } = queryInfo;
  const tokenExpiredIn = dayjs().add(30, 'minutes').toDate(); // 有効期限は30分

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

export const getPasswordResetTokenById = async(prisma: PrismaClient, id: string) => {
  const record = await prisma.passwordResetToken.findUnique({
    where: { id },
    select: {
      id: true,
      hashedToken: true,
      tokenExpiredIn: true,
      userId: true,
    }
  })
  devLog('取得したPasswordResetTokenレコード:', record);
  return record;
}

// 指定されたトークンが有効かどうか検証（DBに存在 + トークンの内容が一致 + 期限が有効）
export const verifyPasswordResetToken = async(id: string, token: string) => {
  try {
    const passwordResetTokenInDB = await dbQueryHandler(getPasswordResetTokenById, id);
    // DBに存在
    if (!passwordResetTokenInDB) {
      devLog('passwordResetTokenが見つかりません');
      return false; // トークンが存在しない場合、false
    }

    // Tokenが一致するか
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

// パスワードリセット => パスワードリセットTokenをDBから削除
export const updateUserPasswordAndDeleteResetToken = async(prisma: PrismaClient, queryInfo: { userId: string, hashedPassword: string }) => {
  const { userId, hashedPassword } = queryInfo;

  await prisma.$transaction([
    prisma.passwordResetToken.deleteMany({ where: { userId } }),
    prisma.user.update({
      where: { id: userId },
      data: { hashedPassword },
    }),
  ]);
}