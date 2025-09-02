import { getRecordsByDate, getRecordsByMonth, getRecordsByWeek, getTotalRecords } from "../models/records/records";
import { dbQueryHandler } from "../models/utils/queryErrorHandler";

export const getRecordsFromDB = async(userId: string, daysAgo: number, weeksAgo: number, monthsAgo: number) => {
  const dailyRecord = await dbQueryHandler(getRecordsByDate, userId, daysAgo);
  const weeklyRecord = await dbQueryHandler(getRecordsByWeek, userId, weeksAgo);
  const monthlyRecord = await dbQueryHandler(getRecordsByMonth, userId, monthsAgo);
  const totalRecord = await dbQueryHandler(getTotalRecords, userId);

  return {
    dailyRecord,
    weeklyRecord,
    monthlyRecord,
    totalRecord,
  }
}