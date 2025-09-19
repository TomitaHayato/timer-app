import { PrismaClient } from "../../../generated/prisma";
import { PostSettingParams, Setting, UpdateSettingParams } from "../../types/setting";
import { selectSetting } from "./utils/selectOption";

export const createSetting = async(prisma: PrismaClient, userId: string, params: PostSettingParams): Promise<Setting> => {
  return await prisma.setting.create({
    ...selectSetting,
    data: {
      userId,
      ...params,
    }
  });
}

export const getSettingByUserId = async(prisma: PrismaClient, userId: string): Promise<Setting | null> => {
  return await prisma.setting.findUnique({
    ...selectSetting,
    where: { userId }
  })
}

export const updateSetting = async(prisma: PrismaClient, userId: string, params: UpdateSettingParams): Promise<Setting> => {
  return await prisma.setting.update({
    ...selectSetting,
    where: { userId },
    data: { ...params },
  });
}

export const deleteSettingByUserId = async(prisma: PrismaClient, userId: string): Promise<void> => {
  await prisma.setting.delete({
    where: { userId }
  });
}
