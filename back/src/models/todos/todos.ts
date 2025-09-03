import { PrismaClient } from "../../../generated/prisma";
import { createTodoParams, updateTodoParams } from "../../types/todo";
import { devLog } from "../../utils/dev/devLog";
import { selectTodoColumns } from "../utils/selectColumns";

export const getTodoById = async(prisma: PrismaClient, params: {userId: string, todoId: string}) => {
  const {userId, todoId} = params;
  const todo = prisma.todo.findUnique({
    select: selectTodoColumns,
    where: {
      id: todoId,
      userId,
    }
  });
  devLog('取得したTodo', todo);
  return todo;
}

// ユーザーのTodoを全件取得
export const getUserTodos = async(prisma: PrismaClient, userId: string) => {
  const todos = await prisma.todo.findMany({
    select: selectTodoColumns,
    where: { userId },
  });
  devLog('Todo一覧取得', todos);
  return todos;
}

// Todoを新規作成
export const createTodo = async(prisma: PrismaClient, params: createTodoParams, userId: string) => {
  // 作成
  const newTodo = await prisma.todo.create({
    select: selectTodoColumns,
    data: {
      userId,
      ...params,
    }
  })
  devLog('作成されたTodo:', newTodo)
}

// Todoの情報を更新
export const updateTodo = async(prisma: PrismaClient, params: {todoParams: updateTodoParams, userId: string, todoId: string}) => {
  const {todoParams, userId, todoId} = params
  // 更新処理
  const result = await prisma.todo.update({
    select: selectTodoColumns,
    where: {
      id: todoId,
      userId,
    },
    data: {
      title: todoParams.title,
      deadline: todoParams.deadline || null, // Deadlineカラムがundefinedの場合、DBカラムをnullにする
    }
  });
  devLog('更新結果：', result);
}

// Todoのステータスを更新
export const updateTodoStatus = async(prisma: PrismaClient, params: {userId: string, todoId: string, newStatus: boolean}) => {
  const {userId, todoId, newStatus} = params;
  // ステータス更新処理
  const result = await prisma.todo.update({
    select: selectTodoColumns,
    where: {
      id: todoId,
      userId,
    },
    data: {
      isCompleted: newStatus,
      // completedAtカラム: 完了=>現在日時、未完了=>NULL
      completedAt: newStatus ? new Date() : null,
    }
  });
  devLog('更新結果：', result);
}

// Todoを削除
export const deleteTodo = async(prisma: PrismaClient, params: {userId: string, todoId: string}) => {
  const { userId, todoId } = params;
  // 削除処理
  await prisma.todo.delete({
    where: {
      id: todoId,
      userId,
    }
  });
}

