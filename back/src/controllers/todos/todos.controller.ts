import { NextFunction, Request, Response } from "express";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import { getUserById } from "../../models/users";
import { createTodo, getUserTodos } from "../../models/todos";
import { createTodoParams } from "../../types/todo";

// Todosを全件取得
export const todosIndex = async(req: Request, res: Response, next: NextFunction) => {
  const userId = req.decodedJwtPayload.userId;

  try {
    // DBからログインユーザーのTodo一覧を取得
    const todos = await dbQueryHandler(getUserTodos, userId);
    // レスポンスに添付して返す
    res.status(200).json(todos);
  } catch(err) { next(err) }
}

// Todoを新規作成
export const postTodos = async(req: Request, res: Response, next: NextFunction) => {
  const userId = req.decodedJwtPayload.userId;
  const params: createTodoParams = req.body;

  try {
    // 作成処理
    await dbQueryHandler(createTodo, { params, userId });
    // 最新状態を返す
    const todos = await dbQueryHandler(getUserTodos, userId);
    res.status(201).json(todos);
  } catch(err) { next(err) }
}

// TODOのStatus更新
export const updateTodoStatus = async(req: Request, res: Response, next: NextFunction) => {}
