import { PrismaClient } from "../../../generated/prisma";
import { PostSettingParams, UpdateSettingParams } from "../../types/setting";
import { devLog } from "../../utils/dev/devLog";

export const createSetting = async(prisma: PrismaClient, userId: string, params: PostSettingParams) => {
  const newSettig = await prisma.setting.create({
    data: {
      userId,
      ...params,
    }
  })
  devLog('新しい設定値：', newSettig);
  return newSettig;
}

export const getSettingByUserId = async(prisma: PrismaClient, userId: string) => {
  return await prisma.setting.findUnique({
    select: {
      isMuted: true,
      volume: true,
      workSec: true,
      restSec: true,
      longRestSec: true,
    },
    where: {
      userId,
    }
  })
}

export const updateSetting = async(prisma: PrismaClient, userId: string, settingId: string, params: UpdateSettingParams) => {
  const newSettig = await prisma.setting.update({
    where: {
      id: settingId,
      userId,
    },
    data: {
      ...params,
    }
  })
  devLog('更新後の設定値：', newSettig);
  return newSettig;
}

export const deleteSettingByUserId = async(prisma: PrismaClient, userId: string) => {
  await prisma.setting.delete({
    where: { userId }
  });
}