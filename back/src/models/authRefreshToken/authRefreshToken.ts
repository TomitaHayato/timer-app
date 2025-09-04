import { PrismaClient } from "../../../generated/prisma";
import { authRefreshTokenSelect } from "./utils/selectOption";


// userIdとtokenからレコードを取得
export const getRefreshToken = async(prisma: PrismaClient, params: {userId: string, token: string}) => {
  const { userId, token } = params;
  return prisma.authRefreshToken.findUnique({
    select: authRefreshTokenSelect(),
    where: {
      userId,
      token,
    },
  });
}

// userIdとtokenからレコードを取得
export const getRefreshTokenByUserId = async(prisma: PrismaClient, userId: string) => {
  return prisma.authRefreshToken.findUnique({
    select: authRefreshTokenSelect(),
    where: {
      userId
    },
  });
}

export const createRefreshToken = async(prisma: PrismaClient, params: { userId: string, token: string, expiresAt: Date }) => {
  const {userId, token, expiresAt} = params;
  return prisma.authRefreshToken.create({
    data: {
      token,
      expiresAt,
      userId,
    },
  });
}

// userIdで指定したrefreshTokenのtoken, expiresAtを更新
export const updateRefreshToken = async(prisma: PrismaClient, params: {userId: string, newToken: string, expiresAt: Date}) => {
  const { userId, newToken, expiresAt } = params;
  return prisma.authRefreshToken.update({
    where: {
      userId,
    },
    data: {
      token: newToken,
      expiresAt,
    }
  });
}

export const deleteRefreshToken = async(prisma: PrismaClient, userId: string) => {
  await prisma.authRefreshToken.delete({
    where: { userId },
  });
}
