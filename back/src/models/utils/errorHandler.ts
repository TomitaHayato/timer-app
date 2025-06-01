import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

// DBクエリ処理をエラーハンドラーでラップする
export const dbQueryHandler = async < T, ArgsObject extends object | string | undefined = undefined >(
  queryFn: (args: ArgsObject) => Promise<T>,
  args: ArgsObject
): Promise<T> => {
  try {
    return await queryFn(args);
  } catch(err) {
    // console.error(err)
    throw err;
  } finally {
    await prisma.$disconnect()
  }
}
