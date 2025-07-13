import { PrismaClient } from "../../../generated/prisma";
import { devLog } from "../../utils/dev/devLog";

const prisma = new PrismaClient();

// DBクエリ処理をエラーハンドラーでラップする（引数は[ オブジェクト１つ ]または[ 文字列 ]のみを想定）
export const dbQueryHandler = async < T, Args extends object | string | undefined = undefined >(
  queryFn: (prisma: PrismaClient, args: Args) => Promise<T>,
  args: Args
): Promise<T> => {
  try {
    return await queryFn(prisma, args);
  } catch(err) {
    devLog(err)
    throw err;
  } finally {
    await prisma.$disconnect()
  }
}
