import { randomUUID } from "crypto";
import { PrismaClient } from "../../../generated/prisma";
import { defaultSetting } from "../../config/defaultVals/defaultSetting";
import { UserPostParams, UserUpdateParams } from "../../types/user";
import { devLog } from "../../utils/dev/devLog";
import { selectRecordColumns, selectSettingColumns, selectTodoColumns } from "../utils/selectColumns";
import dayjs from "dayjs";
import { dataHash } from "../../utils/dataHash";

export const getAllUser = async(prisma: PrismaClient) => {
  const allUsers = await prisma.user.findMany();
  devLog(allUsers);
  return allUsers;
}

export const getUserById = async(prisma: PrismaClient, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  })
  devLog('user取得', user);
  return user;
}

export const getUserByEmail = async(prisma: PrismaClient, email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  })
  devLog('user取得', user);
  return user;
}

export const getUserWithRelation = async(
  prisma: PrismaClient,
  queryInfo: {
    userId: string,
    setting?: boolean,
    todos?: boolean,
    records?: boolean,
}) => {
  const { userId, setting, todos, records } = queryInfo;
  const user = await prisma.user.findUnique({
    select: {
      name: true,
      email: true,
      ...(setting && {
        setting: { select: selectSettingColumns }
      }),
      ...(records && {
        records: { select: selectRecordColumns }
      }),
      todos: { select: selectTodoColumns },
    },
    where: {
      id: userId,
    }
  })
  devLog('DB: 認証完了したUser:', user)
  return user;
}

export const createUserWithRelation = async(prisma: PrismaClient, params: UserPostParams) => {
  // refreshToken用の値
  const token = randomUUID();
  const expiresAt = dayjs().add(14, 'day').toDate(); // 期限を2週間後に設定
  // 作成処理
  const newUser = await prisma.user.create({
    data: {
      ...params,
      setting: {
        create: {
          ...defaultSetting
        }
      },
      authRefreshToken: {
        create: {
          token,
          expiresAt,
        }
      }
    }
  });
  // 作成したレコードを返す
  devLog('作成されたUserと関連:', newUser);
  const createdUser = await prisma.user.findUnique({ where: params });
  return createdUser;
}

export const updateUser = async(prisma: PrismaClient, params: UserUpdateParams, userId: string) => {
  const user = await prisma.user.update({
    select: {
      name: true,
      email: true
    },
    where: { id: userId },
    data: params,
  })
  return user
}

export const updateUserPassword = async(prisma: PrismaClient, password: string, userId: string) => {
  const hashedPassword = await dataHash(password);

  const newUser = await prisma.user.update({
    where: { id: userId },
    data: { hashedPassword },
  });

  devLog('更新済のUser:', newUser);
  return;
}

export const deleteUserById = async(prisma: PrismaClient, userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  })
}

export const deleteUserNonEmail = async(prisma: PrismaClient) => {
  await prisma.user.delete({
    where: { email: "" },
  })
}
