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
  console.log(user);
  return user;
}

export const createUser = async(params: UserPostParams) => {
  // 作成処理
  await prisma.user.create({ data: params });
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
