import { PrismaClient } from "../../../generated/prisma";
import { devLog } from "../../utils/dev/devLog";

export const prismaClient = new PrismaClient();

// DBクエリ処理をエラーハンドラーでラップする
export const dbQueryHandler = async < T, Args extends unknown[] >(
  queryFn: (prismaClient: PrismaClient, ...args: Args) => Promise<T>,
  ...args: Args
): Promise<T> => {
  try {
    return await queryFn(prismaClient, ...args);
  } catch(err) {
    devLog(err)
    throw err;
  }
}
