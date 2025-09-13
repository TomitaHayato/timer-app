import dayjs from "dayjs";
import { getAllRecordsOfUser, getRecordsByPiriod } from "../models/records/records";
import { summarizeRecords } from "../models/records/utils/summarizeRecords";
import { dbQueryHandler } from "../models/utils/queryErrorHandler";
import { Record, RecordSummaryByPeriod } from "../types/record";

type PiriodQuery = {
  daysAgo: number,
  weeksAgo: number,
  monthsAgo: number,
}

const _defaultRecordsQuery = (): PiriodQuery => ({
  daysAgo: 0,
  weeksAgo: 0,
  monthsAgo: 0,
});

export const getSummarizedRecords = async(
  userId: string,
  query?: PiriodQuery
): Promise<RecordSummaryByPeriod> => {
  const { daysAgo, weeksAgo, monthsAgo } = query ?? _defaultRecordsQuery();
  const dailyRecord = await getRecordsByDate(userId, daysAgo);
  const weeklyRecord = await getRecordsByWeek(userId, weeksAgo);
  const monthlyRecord = await getRecordsByMonth(userId, monthsAgo);
  const totalRecord = await getTotalRecords(userId);

  return {
    dailyRecord,
    weeklyRecord,
    monthlyRecord,
    totalRecord,
  }
}

export const getTotalRecords = async(userId: string): Promise<Record> => {
  const records = await dbQueryHandler(getAllRecordsOfUser, userId);
  return summarizeRecords(records);
}

// 指定された日の記録を取得
export const getRecordsByDate = async(userId: string, daysAgo: number = 0): Promise<Record> => {
  const targetDay = dayjs().subtract(daysAgo, 'd'); // 何日前のデータが欲しいか

  const start = targetDay.startOf('day').toDate();
  const end = targetDay.endOf('day').toDate();
  return await _getSummarizedRecordsByPiriod(userId, start, end);
}

// 指定された週の記録を取得
export const getRecordsByWeek = async(userId: string, weeksAgo: number = 0): Promise<Record> => {
  const targetWeek = dayjs().subtract(weeksAgo, 'w');

  const start = targetWeek.startOf('week').toDate()
  const end = targetWeek.endOf('week').toDate()
  return await _getSummarizedRecordsByPiriod(userId, start, end);
}

// 指定された月の記録を取得
export const getRecordsByMonth = async(userId: string, monthsAgo: number = 0): Promise<Record> => {
  const targetMonth = dayjs().subtract(monthsAgo, 'm');

  const start = targetMonth.startOf('month').toDate()
  const end = targetMonth.endOf('month').toDate()
  return await _getSummarizedRecordsByPiriod(userId, start, end);
}


// 指定期間のRecordsを取得し集計する
const _getSummarizedRecordsByPiriod = async(userId: string, start: Date, end: Date): Promise<Record> => {
  const records = await dbQueryHandler(getRecordsByPiriod, { userId, start, end });
  return summarizeRecords(records);
}