import { Prisma } from "../../../../generated/prisma";

export const selectRecordColumns = Prisma.validator<Prisma.RecordSelect>()({
  workCount: true,
  workTime: true,
});

export const selectRecord = Prisma.validator<Prisma.RecordDefaultArgs>()({
  select: selectRecordColumns,
});
