import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

// DBクエリ処理をエラーハンドラーでラップする
export const dbQueryHandler = async <T>(queryFn: () => Promise<T>) => {
  try {
    return await queryFn();
  } catch(err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
