import { getUserWithRelation } from "../models/users/users";
import { dbQueryHandler } from "../models/utils/queryErrorHandler";
import { getAllSummarizedRecordsFromDB } from "./records.service";

export const getUserDataSet = async(userId: string) => {
  const userData = await dbQueryHandler(getUserWithRelation, {
    userId: userId,
    setting: true,
    todos: true,
  });
  const recordsData = await getAllSummarizedRecordsFromDB(userId);
  return {
    userData,
    recordsData,
  }
}
