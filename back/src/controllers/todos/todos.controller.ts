import { NextFunction, Request, Response } from "express";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import { getUserById } from "../../models/users";
import { getUserTodos } from "../../models/todos";

// Todosを全件取得
export const todosIndex = async(req: Request, res: Response, next: NextFunction) => {
  const userId = req.decodedJwtPayload.userId;

  try {
    // DBからログインユーザーのTodo一覧を取得
    const todos = await dbQueryHandler(getUserTodos, userId);
    console.log('取得したTodo', todos);
    // レスポンスに添付して返す
    res.status(200).json(todos);
  } catch(err) { next(err) }
}
