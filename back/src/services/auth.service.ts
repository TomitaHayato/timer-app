import { getUserWithRelation } from "../models/users/users";
import { dbQueryHandler } from "../models/utils/errorHandler";
import { getRecordsFromDB } from "./records.service";

export const getUserDataSet = async(userId: string) => {
  const userData = await dbQueryHandler(getUserWithRelation, {
    userId: userId,
    setting: true,
    todos: true,
  });
  const recordsData = await getRecordsFromDB(userId, 0, 0, 0);
  return {
    userData,
    recordsData,
  }
}
