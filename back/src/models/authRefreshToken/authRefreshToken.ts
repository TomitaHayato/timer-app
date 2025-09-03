import dayjs from "dayjs";
import { PrismaClient } from "../../../generated/prisma";
import { devLog } from "../../utils/dev/devLog";
import { authRefreshTokenSelect } from "./utils/selectOption";
import { randomUUID } from "crypto";

// userIdとtokenからレコードを取得
export const getRefreshToken = async(prisma: PrismaClient, params: {userId: string, token: string}) => {
  const { userId, token } = params;
  const refreshToken = prisma.authRefreshToken.findUnique({
    select: authRefreshTokenSelect(),
    where: {
      userId,
      token,
    },
  })
  return refreshToken;
}

// userIdとtokenからレコードを取得
export const getRefreshTokenByUserId = async(prisma: PrismaClient, userId: string) => {
  const refreshToken = prisma.authRefreshToken.findUnique({
    select: authRefreshTokenSelect(),
    where: {
      userId
    },
  })
  return refreshToken;
}

export const createRefreshToken = async(prisma: PrismaClient, userId: string) => {
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

// 既存のレコードがあれば更新、なければ作成
export const createOrUpdateRefreshToken = async(prisma: PrismaClient, userId: string) => {
  const tokenNow = await getRefreshTokenByUserId(prisma, userId);

  if(!tokenNow) {
    // 既存のトークンがない場合、作成
    const token = await createRefreshToken(prisma, userId)
    return token;
  } else {
    // 既存のトークンがある場合、更新
    const newToken = randomUUID();
    const token = await updateRefreshToken(prisma, {userId, newToken});
    return token;
  }
}

// userIdで指定したrefreshTokenのtoken, expiresAtを更新
export const updateRefreshToken = async(prisma: PrismaClient, params: {userId: string, newToken: string}) => {
  const {userId, newToken} = params;
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

export const deleteRefreshToken = async(prisma: PrismaClient, userId: string) => {
  await prisma.authRefreshToken.delete({
    where: { userId },
  });
}
