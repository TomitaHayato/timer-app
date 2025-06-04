import { PrismaClient } from "../../../generated/prisma";
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

export const createUser = async(prisma: PrismaClient, params: UserPostParams) => {
  // 作成処理
  await prisma.user.create({ data: params });
  // 作成したレコードを返す
  const newRecords = await prisma.user.findUnique({ where: params });
  return newRecords;
}

export const updateUser = async(prisma: PrismaClient, userUpdateParams: UserUpdateParams, userId: string) => {
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
