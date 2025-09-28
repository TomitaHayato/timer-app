import { PrismaClient } from "../../generated/prisma";
import { selectAuthRefreshToken } from "../models/authRefreshToken/utils/selectOption";
import { selectCsrfSecret } from "../models/csrfSecret/utils/selectOption";
import { generateRefreshTokenInfo } from "./authRefreshToken.service";

export const createOrUpdateRefreshTokenAndCsrfSecret = async(prisma: PrismaClient, params: { userId: string, secret: string }) => {
  const { userId, secret } = params;
  // refreshTokenのトークン、期限を作成
  const { token: refreshToken, expiresAt } = generateRefreshTokenInfo();

  return await prisma.$transaction(async (tx) => {
    const refreshTokenRecord = await tx.authRefreshToken.upsert({
      ...selectAuthRefreshToken,
      where: { userId },
      create: {
        token: refreshToken,
        expiresAt,
        userId
      },
      update: {
        token: refreshToken,
        expiresAt,
      },
    });

    const csrfSecretRecord = await tx.csrfSecret.upsert({
      ...selectCsrfSecret,
      where: { userId },
      create: {
        secret,
        userId
      },
      update: { secret }
    });

    return {
      csrfSecretRecord,
      refreshTokenRecord,
    }
  });
}

// 該当レコードがない場合にエラーにならないよう、deleteManyを使用
export const deleteRefreshTokenAndCsrfSecret = async(prisma: PrismaClient, userId: string) => {
  return await prisma.$transaction(async(tx) => {
    await tx.authRefreshToken.deleteMany({ where: { userId } });
    await tx.csrfSecret.deleteMany({ where: { userId } });
  })
}
