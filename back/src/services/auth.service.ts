import { getUserWithRelation } from "../models/users/users";
import { dbQueryHandler } from "../models/utils/queryErrorHandler";
import { devLog } from "../utils/dev/devLog";
import { getSummarizedRecords } from "./records.service";

export const getUserDataSet = async(userId: string) => {
  const userData = await dbQueryHandler(getUserWithRelation, {
    userId: userId,
    setting: true,
    todos: true,
  });
  const recordsData = await getSummarizedRecords(userId);

  devLog('UserDataSet:', userData);
  devLog('recordsData:', recordsData);
  devLog('まとめたもの:', {
    ...userData,
    ...recordsData,
  })

  return {
    userData,
    recordsData,
  }
}
