import dayjs from "dayjs";
import { PrismaClient } from "../../../generated/prisma";
import { devLog } from "../../utils/dev/devLog";
import { authRefreshTokenSelect } from "./utils/selectOption";
import { randomUUID } from "crypto";

// userIdとtokenからレコードを取得
export const getRefreshToken = async(prisma: PrismaClient, queryInfo: { userId: string, token: string }) => {
  const { userId, token } = queryInfo;
  const refreshToken = prisma.authRefreshToken.findUnique({
    select: authRefreshTokenSelect(),
    where: {
      userId,
      token,
    },
  })
  return refreshToken;
}

export const createRefreshToken = async(prisma: PrismaClient, queryInfo: { userId: string }) => {
  const { userId } = queryInfo;
  const token = randomUUID();
  const expiresAt = dayjs().add(14, 'day').toDate(); // 期限を2週間後に設定
  const newToken = prisma.authRefreshToken.create({
    data: {
      token,
      expiresAt,
      userId,
    },
  });
  devLog('model: createしたauthRefreshToken', newToken);
  return newToken;
}

// userIdで指定したrefreshTokenのtoken, expiresAtを更新
export const updateRefreshToken = async(prisma: PrismaClient, queryInfo: { userId: string, newToken: string }) => {
  const { userId, newToken } = queryInfo;
  const expiresAt = dayjs().add(14, 'day').toDate(); // 期限を2週間後に設定
  const updatedToken = prisma.authRefreshToken.update({
    where: {
      userId,
    },
    data: {
      token: newToken,
      expiresAt,
    }
  })
  devLog('model:update後のrefreshToken', updatedToken);
  return updatedToken;
}