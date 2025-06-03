import { PrismaClient } from "../../generated/prisma";
import { createTodoParams, updateTodoParams } from "../types/todo";

// ユーザーのTodoを全件取得
export const getUserTodos = async(prisma: PrismaClient, userId: string) => {
  const todos = await prisma.todo.findMany({
    where: { userId },
  });
  console.log('Todo一覧取得', todos);
  return todos;
}

// Todoを新規作成
export const createTodo = async(prisma: PrismaClient, queryInfo: { params: createTodoParams, userId: string, }) => {
  const { userId, params } = queryInfo;
  // 作成
  const newTodo = await prisma.todo.create({
    data: {
      userId,
      ...params,
    }
  })
  console.log('作成されたTodo:', newTodo)
  // 一覧を返す
  return await getUserTodos(prisma, userId);
}

// Todoの情報を更新
export const updateTodo = async(prisma: PrismaClient, queryInfo: { params: updateTodoParams, userId: string, todoId: string, }) => {
  const { userId, todoId, params } = queryInfo;
  // 更新処理
  const result = await prisma.todo.update({
    where: {
      id: todoId,
      userId,
    },
    data: {
      ...params,
    }
  });
  console.log('更新結果：', result);
  // 全件返却
  return await getUserTodos(prisma, userId);
}

// Todoのステータスを更新
export const updateTodoStatus = async(prisma: PrismaClient, queryInfo: { userId: string, todoId: string, status: boolean }) => {
  const { userId, todoId, status } = queryInfo;
  // ステータス更新処理
  const result = await prisma.todo.update({
    where: {
      id: todoId,
      userId,
    },
    data: { isCompleted: status }
  });
  console.log('更新結果：', result);
  // 全件返却
  return await getUserTodos(prisma, userId);
}

// Todoを削除
export const deleteTodo = async(prisma: PrismaClient, queryInfo: { userId: string, todoId: string, }) => {
  const { userId, todoId } = queryInfo;
  // 削除処理
  await prisma.todo.delete({
    where: {
      id: todoId,
      userId,
    }
  });
  // 全件返却
  return await getUserTodos(prisma, userId);
}

