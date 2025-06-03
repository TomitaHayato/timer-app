import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

// DBクエリ処理をエラーハンドラーでラップする（引数は[ オブジェクト１つ ]または[ 文字列 ]のみを想定）
export const dbQueryHandler = async < T, ArgsObject extends object | string | undefined = undefined >(
  queryFn: (prisma: PrismaClient, args: ArgsObject) => Promise<T>,
  args: ArgsObject
): Promise<T> => {
  try {
    return await queryFn(prisma, args);
  } catch(err) {
    // console.error(err)
    throw err;
  } finally {
    await prisma.$disconnect()
  }
}
