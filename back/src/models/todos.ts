import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getUserTodos = async(userId: string) => {
  const todos = await prisma.todo.findMany({
    where: { userId },
  });
  console.log('Todo一覧取得', todos);
  return todos;
}
