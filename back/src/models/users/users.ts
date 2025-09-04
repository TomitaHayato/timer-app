import { PrismaClient } from "../../../generated/prisma";
import { defaultSetting } from "../../config/defaultVals/defaultSetting";
import { UserPostParams, UserUpdateParams } from "../../types/user";
import { selectRecordColumns, selectSettingColumns, selectTodoColumns } from "../utils/selectColumns";
import { selectUserColumnsMini, selectUserColumnsWithIdAndPass, selectUserColumnsWithId } from "./utils/selectOption";

export const getAllUser = async(prisma: PrismaClient) => {
  return await prisma.user.findMany();
}

export const getUserById = async(prisma: PrismaClient, userId: string) => {
  return await prisma.user.findUnique({
    select: selectUserColumnsWithId(),
    where: { id: userId },
  });
}

export const getUserByEmail = async(prisma: PrismaClient, email: string) => {
  return await prisma.user.findUnique({
    select: selectUserColumnsWithIdAndPass(),
    where: { email },
  });
}

export const getUserWithRelation = async(
  prisma: PrismaClient,
  params: {
    userId: string,
    setting?: boolean,
    todos?: boolean,
    records?: boolean,
}) => {
  const { userId, setting, todos, records } = params;
  return await prisma.user.findUnique({
    select: {
      ...selectUserColumnsMini(),
      ...(setting && {
        setting: { select: selectSettingColumns }
      }),
      ...(records && {
        records: { select: selectRecordColumns }
      }),
      ...(todos && {
        todos: { select: selectTodoColumns },
      }),
    },
    where: { id: userId },
  });
}

export const createNewUser = async(prisma: PrismaClient, params: UserPostParams, token: string, expiresAt: Date) => {
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
    select: selectUserColumnsWithId(),
  });
}

export const updateUser = async(prisma: PrismaClient, params: UserUpdateParams, userId: string) => {
  const user = await prisma.user.update({
    select: selectUserColumnsMini(),
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
