import { PrismaClient } from "../../../generated/prisma";
import { devLog } from "../../utils/dev/devLog";

const prisma = new PrismaClient();

// DBクエリ処理をエラーハンドラーでラップする
export const dbQueryHandler = async < T, Args extends unknown[] >(
  queryFn: (prisma: PrismaClient, ...args: Args) => Promise<T>,
  ...args: Args
): Promise<T> => {
  try {
    return await queryFn(prisma, ...args);
  } catch(err) {
    devLog(err)
    throw err;
  } finally {
    await prisma.$disconnect()
  }
}
