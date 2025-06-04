import { NextFunction, Request, Response } from "express";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import { createTodo, deleteTodo, getTodoById, getUserTodos, updateTodo, updateTodoStatus } from "../../models/todos";
import { createTodoParams, updateTodoParams } from "../../types/todo";
import { isEmptyObj } from "../../utils/object";

// Todosを全件取得
export const todosIndex = async(req: Request, res: Response, next: NextFunction) => {
  const userId = req.decodedJwtPayload.userId;
  if (!userId) {
    res.status(422).json('無効なリクエストです');
    return;
  }

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

  if (!userId || isEmptyObj(params)) {
    res.status(422).json('無効なリクエストです');
    return;
  }

  try {
    // 作成処理
    await dbQueryHandler(createTodo, { params, userId });
    // 最新状態を返す
    const todos = await dbQueryHandler(getUserTodos, userId);
    res.status(201).json(todos);
  } catch(err) { next(err) }
}

// TODOのStatus更新
export const updateTodosStatus = async(req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.decodedJwtPayload.userId;
  const todoId: string = req.params.id;
  const params: { isCompleted: boolean } =req.body;

  if(!userId || !todoId || typeof params.isCompleted !== 'boolean') {
    res.status(422).json('無効なリクエストです');
    return;
  }
 
  try {
    // 現在のステータスの値を取得
    const todo = await dbQueryHandler(getTodoById, { userId, todoId });
    if (!todo) {
      res.status(422).json('無効なリクエストです');
      return;
    }
    const statusNow: boolean | undefined = todo?.isCompleted;
    // 更新処理
    await dbQueryHandler(updateTodoStatus, { userId, todoId, status: !statusNow });
    // 最新状態を返す
    const todos = await dbQueryHandler(getUserTodos, userId);
    res.status(200).json(todos);
  } catch(err){ next(err) }
}

// レコード更新
export const updateTodoRecord= async(req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.decodedJwtPayload.userId;
  const todoId: string = req.params.id;
  const params: updateTodoParams =req.body;

  if(!userId || !todoId || isEmptyObj(params)) {
    res.status(422).json('無効なリクエストです');
    return;
  }

  try {
    // 更新処理
    await dbQueryHandler(updateTodo, { userId, todoId, params });
    // 最新状態を返す
    const todos = await dbQueryHandler(getUserTodos, userId);
    res.status(200).json(todos);
  } catch(err) { next(err) }
}

// レコード削除
export const deleteTodoRecord = async(req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.decodedJwtPayload.userId;
  const todoId: string = req.params.id;

  if(!userId || !todoId) {
    res.status(422).json('無効なリクエストです');
    return;
  }

  try {
    // 削除処理
    await dbQueryHandler(deleteTodo, { userId, todoId });
    // 最新状態を返す
    const todos = await dbQueryHandler(getUserTodos, userId);
    res.status(200).json(todos);
  } catch(err) { next(err) }
}
