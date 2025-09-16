import { PrismaClient } from "../../../generated/prisma";
import { PostSettingParams, Setting, UpdateSettingParams } from "../../types/setting";
import { selectSettingColumns } from "../utils/selectColumns";

export const createSetting = async(prisma: PrismaClient, userId: string, params: PostSettingParams): Promise<Setting> => {
  return await prisma.setting.create({
    select: selectSettingColumns(),
    data: {
      userId,
      ...params,
    }
  });
}

export const getSettingByUserId = async(prisma: PrismaClient, userId: string): Promise<Setting | null> => {
  return await prisma.setting.findUnique({
    select: selectSettingColumns(),
    where: { userId }
  })
}

export const updateSetting = async(prisma: PrismaClient, userId: string, params: UpdateSettingParams): Promise<Setting> => {
  return await prisma.setting.update({
    where: { userId },
    data: { ...params },
    select: selectSettingColumns(),
  });
}

export const deleteSettingByUserId = async(prisma: PrismaClient, userId: string): Promise<void> => {
  await prisma.setting.delete({
    where: { userId }
  });
}
