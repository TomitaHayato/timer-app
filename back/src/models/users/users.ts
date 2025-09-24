import { PrismaClient } from "../../../generated/prisma";
import { defaultSetting } from "../../config/defaultVals/defaultSetting";
import { NewUserPostParams, User, Users, UserUpdateParams, UserWithRisk } from "../../types/user";
import { selectUserColumnsWithIdAndPass, selectUserColumnsWithId, selectUserWithSettingAndTodos, UserWithSettingAndTodos } from "./utils/selectOption";

export const getAllUser = async(prisma: PrismaClient): Promise<Users> => {
  return await prisma.user.findMany({
    select: selectUserColumnsWithId,
  });
}

export const getUserById = async(prisma: PrismaClient, userId: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    select: selectUserColumnsWithId,
    where: { id: userId },
  });
}

export const getUserByEmail = async(prisma: PrismaClient, email: string): Promise<UserWithRisk | null> => {
  return await prisma.user.findUnique({
    select: selectUserColumnsWithIdAndPass,
    where: { email },
  });
}

export const getUserWithSettingAndTodos = async(
  prisma: PrismaClient,
  userId: string
): Promise<UserWithSettingAndTodos> => {
  return await prisma.user.findUniqueOrThrow({
    ...selectUserWithSettingAndTodos,
    where: { id: userId },
  });
}

export const createNewUser = async(prisma: PrismaClient, params: NewUserPostParams, token: string, expiresAt: Date): Promise<User> => {
  // 作成処理
  return await prisma.user.create({
    data: {
      ...params,
      setting: {
        create: { ...defaultSetting() }
      },
      authRefreshToken: {
        create: {
          token,
          expiresAt,
        }
      }
    },
    select: selectUserColumnsWithId,
  });
}

export const updateUser = async(prisma: PrismaClient, params: UserUpdateParams, userId: string): Promise<User> => {
  const user = await prisma.user.update({
    select: selectUserColumnsWithId,
    where: { id: userId },
    data: params,
  })
  return user
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
