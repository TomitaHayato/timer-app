import { PrismaClient } from "../../../generated/prisma";
import { postRecordParams } from "../../types/record";
import { devLog } from "../../utils/dev/devLog";
import dayjs from 'dayjs'
import { summarizeRecords } from "./utils/summarizeRecords";

export const createRecord = async(prisma: PrismaClient, queryInfo: { userId: string, params: postRecordParams }) => {
  const { userId, params } = queryInfo;

  const newRecord = await prisma.record.create({
    data: {
      userId,
      ...params,
    }
  })
  devLog('新規作成Record：', newRecord);
}

export const getAllRecords = async(prisma: PrismaClient, userId: string) => {
  const records = await prisma.record.findMany({
    select: {
      selfReview: true,
      workCount: true,
      workTime: true,
    },
    where: { userId }
  })
  devLog('Records全件取得：', records);
  return summarizeRecords(records);
}

// 指定された期間のRecordsを取得（このファイル内から呼び出し）
const getRecordsByTerms = async(prisma: PrismaClient, userId: string, start: Date, end: Date) => {
  const records = await prisma.record.findMany({
    select: {
      selfReview: true,
      workCount: true,
      workTime: true,
    },
    where: {
      userId,
      createdAt: {
        gte: start,
        lte: end,
      }
    }
  })
  devLog(`期間ごとのRecords全件取得：`, records);
  return summarizeRecords(records);
}

// 指定された日の記録を取得
export const getRecordsByDate = async(prisma: PrismaClient, queryInfo: { userId: string, beforeDaysFromToday: number }) => {
  const { userId } = queryInfo;
  const beforeDaysFromToday = queryInfo.beforeDaysFromToday || 0

  const targetDay = dayjs().subtract(beforeDaysFromToday, 'd'); // 何日前のデータが欲しいか

  const start = targetDay.startOf('day').toDate()
  const end = targetDay.endOf('day').toDate()
  return await getRecordsByTerms(prisma, userId, start, end);
}

// 指定された週の記録を取得
export const getRecordsByWeek = async(prisma: PrismaClient, queryInfo: { userId: string, beforeWeeksFromToday?: number }) => {
  const { userId } = queryInfo;
  const beforeWeeksFromToday = queryInfo.beforeWeeksFromToday || 0

  const targetWeek = dayjs().subtract(beforeWeeksFromToday, 'w');

  const start = targetWeek.startOf('week').toDate()
  const end = targetWeek.endOf('week').toDate()
  return await getRecordsByTerms(prisma, userId, start, end);
}

// 指定された月の記録を取得
export const getRecordsByMonth = async(prisma: PrismaClient, queryInfo: { userId: string, beforeMonthsFromToday: number }) => {
  const { userId } = queryInfo;
  const beforeMonthsFromToday = queryInfo.beforeMonthsFromToday || 0

  const targetMonth = dayjs().subtract(beforeMonthsFromToday, 'm');

  const start = targetMonth.startOf('month').toDate()
  const end = targetMonth.endOf('month').toDate()
  return await getRecordsByTerms(prisma, userId, start, end);
}

export const deleteAllRecords = async(prisma: PrismaClient, userId: string) => {
  await prisma.record.deleteMany({
    where: { userId }
  });
}
