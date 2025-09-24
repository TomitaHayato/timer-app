import { Prisma } from "../../../../generated/prisma";

export const selectSettingColumns = Prisma.validator<Prisma.SettingSelect>()({
  isMuted: true,
  volume: true,
  workSec: true,
  restSec: true,
  longRestSec: true,
  workingSound: true,
  bgImage: true,
});

export const selectSetting = Prisma.validator<Prisma.SettingDefaultArgs>()({
  select: selectSettingColumns,
});
