import { PrismaClient } from "../../../generated/prisma";
import { defaultSetting } from "../../config/defaultVals/defaultSetting";
import { UserPostParams, UserUpdateParams } from "../../types/user";
import { devLog } from "../../utils/dev/devLog";

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
      setting,
      todos,
      records,
    },
    where: {
      id: userId,
    }
  })
  devLog('DB: 認証完了したUser:', user)
  return user;
}

export const createUserWithSetting = async(prisma: PrismaClient, params: UserPostParams) => {
  // 作成処理
  await prisma.user.create({
    data: {
      ...params,
      setting: {
        create: {
          ...defaultSetting
        }
      }
    }
  });
  // 作成したレコードを返す
  const newRecords = await prisma.user.findUnique({ where: params });
  return newRecords;
}

export const updateUser = async(prisma: PrismaClient, queryInfo: { userUpdateParams: UserUpdateParams, userId: string }) => {
  const { userUpdateParams, userId } = queryInfo
  prisma.user.update({
    where: { id: userId },
    data: userUpdateParams,
  })
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
