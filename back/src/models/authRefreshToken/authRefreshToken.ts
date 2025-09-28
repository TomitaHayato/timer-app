import { PrismaClient } from "../../../generated/prisma";
import { AuthRefreshToken } from "../../types/authRefreshToken";
import { selectAuthRefreshToken } from "./utils/selectOption";

// userIdとtokenからレコードを取得
export const getRefreshToken = async(prisma: PrismaClient, queryParams: {userId: string, token: string}): Promise<AuthRefreshToken | null> => {
  const { userId, token } = queryParams;
  return prisma.authRefreshToken.findUnique({
    ...selectAuthRefreshToken,
    where: {
      userId,
      token,
    },
  });
}

// userIdとtokenからレコードを取得
export const getRefreshTokenByUserId = async(prisma: PrismaClient, userId: string): Promise<AuthRefreshToken | null> => {
  return prisma.authRefreshToken.findUnique({
    ...selectAuthRefreshToken,
    where: {
      userId
    },
  });
}

export const createRefreshToken = async(prisma: PrismaClient, queryParams: { userId: string, token: string, expiresAt: Date }): Promise<AuthRefreshToken> => {
  const {userId, token, expiresAt} = queryParams;
  return prisma.authRefreshToken.create({
    ...selectAuthRefreshToken,
    data: {
      token,
      expiresAt,
      userId,
    },
  });
}

// userIdで指定したrefreshTokenのtoken, expiresAtを更新
export const updateRefreshToken = async(prisma: PrismaClient, queryParams: {userId: string, newToken: string, expiresAt: Date}): Promise<AuthRefreshToken> => {
  const { userId, newToken, expiresAt } = queryParams;
  return prisma.authRefreshToken.update({
    ...selectAuthRefreshToken,
    where: {
      userId,
    },
    data: {
      token: newToken,
      expiresAt,
    }
  });
}

export const deleteRefreshToken = async(prisma: PrismaClient, userId: string): Promise<void> => {
  await prisma.authRefreshToken.delete({
    where: { userId },
  });
}
