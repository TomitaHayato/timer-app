import { PrismaClient } from "../../generated/prisma";
import { UserPostParams, UserUpdateParams } from "../types/user";

const prisma = new PrismaClient();

export const getAllUser = async() => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  return allUsers;
}

export const getUserById = async(userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  })
  console.log('user取得', user);
  return user;
}

export const getUserByEmail = async(email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  })
  console.log('user取得', user);
  return user;
}

export const createUser = async(params: UserPostParams) => {
  // 作成処理
  await prisma.user.create({ data: params });
  // 作成したレコードを返す
  const newRecords = await prisma.user.findUnique({ where: params });
  return newRecords;
}

export const updateUser = async(userUpdateParams: UserUpdateParams, userId: string) => {
  prisma.user.update({
    where: { id: userId },
    data: userUpdateParams,
  })
}

export const deleteUserById = async(userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  })
}

export const deleteUserNonEmail = async() => {
  await prisma.user.delete({
    where: { email: "" },
  })
}
