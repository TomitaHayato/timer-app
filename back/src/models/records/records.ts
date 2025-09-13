import { PrismaClient } from "../../../generated/prisma";
import { postRecordParams, Record, Records } from "../../types/record";
import { recordSelect } from "./utils/selectOption";

export const createRecord = async(prisma: PrismaClient, userId: string, params: postRecordParams): Promise<Record> => {
  return await prisma.record.create({
    select: recordSelect(),
    data: {
      userId,
      ...params,
    }
  });
}

export const getAllRecordsOfUser = async(prisma: PrismaClient, userId: string): Promise<Records> => {
  return await prisma.record.findMany({
    select: recordSelect(),
    where: { userId }
  });
}

// 指定された期間のRecordsを取得（このファイル内から呼び出し）
export const getRecordsByPiriod = async(prisma: PrismaClient, params: { userId: string, start: Date, end: Date }): Promise<Records> => {
  const { userId, start, end } = params;
  return await prisma.record.findMany({
    select: recordSelect(),
    where: {
      userId,
      createdAt: {
        gte: start,
        lte: end,
      }
    }
  });
}

export const deleteAllRecords = async(prisma: PrismaClient, userId: string): Promise<void> => {
  await prisma.record.deleteMany({
    where: { userId }
  });
}
