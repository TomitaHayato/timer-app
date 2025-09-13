import { PrismaClient } from "../../../generated/prisma"
import { devLog } from "../../utils/dev/devLog";

export const createPasswordResetToken = async(prisma: PrismaClient, params: { userId: string, hashedToken: string, tokenExpiredIn: Date }) => {
  const { userId, hashedToken, tokenExpiredIn } = params;
  return await prisma.passwordResetToken.create({
    data: {
      tokenExpiredIn,
      hashedToken,
      userId,
    }
  });
}

export const deletePasswordResetToken = async(prisma: PrismaClient, userId: string): Promise<void> => {
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId,
    },
  });
  devLog('passwordResetTokenを削除しました');
}

export const getPasswordResetTokenById = async(prisma: PrismaClient, id: string) => {
  return await prisma.passwordResetToken.findUnique({
    where: { id },
    select: {
      id: true,
      hashedToken: true,
      tokenExpiredIn: true,
      userId: true,
    }
  });
}

// パスワードリセット => パスワードリセットTokenをDBから削除
export const updateUserPasswordAndDeleteResetToken = async(prisma: PrismaClient, params: {userId: string, hashedPassword: string}): Promise<void> => {
  const { userId, hashedPassword } = params;

  await prisma.$transaction([
    prisma.passwordResetToken.deleteMany({ where: { userId } }),
    prisma.user.update({
      where: { id: userId },
      data: { hashedPassword },
    }),
  ]);
}