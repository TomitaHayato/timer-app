import { PrismaClient } from "../../generated/prisma";
import { selectAuthRefreshToken } from "../models/authRefreshToken/utils/selectOption";
import { selectCsrfSecret } from "../models/csrfSecret/utils/selectOption";

export const createOrUpdateRefreshTokenAndCsrfSecret = async(prisma: PrismaClient, params: { userId: string, refreshToken: string, expiresAt: Date, secret: string }) => {
  const { userId, refreshToken, expiresAt, secret } = params
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