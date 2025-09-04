import { PrismaClient } from "../../../generated/prisma";
import { PostSettingParams, UpdateSettingParams } from "../../types/setting";
import { devLog } from "../../utils/dev/devLog";
import { selectSettingColumns } from "../utils/selectColumns";

export const createSetting = async(prisma: PrismaClient, userId: string, params: PostSettingParams) => {
  return await prisma.setting.create({
    data: {
      userId,
      ...params,
    }
  });
}

export const getSettingByUserId = async(prisma: PrismaClient, userId: string) => {
  return await prisma.setting.findUnique({
    select: selectSettingColumns,
    where: { userId }
  })
}

export const updateSetting = async(prisma: PrismaClient, userId: string, params: UpdateSettingParams) => {
  return await prisma.setting.update({
    where: { userId },
    data: { ...params },
    select: selectSettingColumns,
  });
}

export const deleteSettingByUserId = async(prisma: PrismaClient, userId: string) => {
  await prisma.setting.delete({
    where: { userId }
  });
}
