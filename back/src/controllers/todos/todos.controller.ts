import { NextFunction, Request, Response } from "express";
import { dbQueryHandler } from "../../models/utils/queryErrorHandler";
import { createTodo, deleteTodo, getTodoById, getUserTodos, updateTodo, updateTodoStatus } from "../../models/todos/todos";
import { createTodoParams, updateTodoParams } from "../../types/todo";
import { isEmptyObj } from "../../utils/object";
import { getUserIdFromRequest } from "../utils/getUserId";
import { getIdFromRequestParams } from "../utils/getIdFromRequestParams";
import { getRequestBody } from "../utils/getRequestBody";

// Todosを全件取得
export const todosIndex = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromRequest(req, res);

  try {
    // DBからログインユーザーのTodo一覧を取得
    const todos = await dbQueryHandler(getUserTodos, userId);
    // レスポンスに添付して返す
    res.status(200).json(todos);
  } catch(err) { next(err) }
}

// Todoを新規作成
export const postTodos = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromRequest(req, res);
  const params = getRequestBody<createTodoParams>(req, res);

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
  const userId = getUserIdFromRequest(req, res);

  const todoId: string = req.params.id;
  if(!todoId) {
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
    const statusNow: boolean = todo.isCompleted;
    // 更新処理（isCompletedを反転）
    await dbQueryHandler(updateTodoStatus, { userId, todoId, newStatus: !statusNow });
    // 最新状態を返す
    const todos = await dbQueryHandler(getUserTodos, userId);
    res.status(200).json(todos);
  } catch(err){ next(err) }
}

// レコード更新
export const updateTodoRecord= async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromRequest(req, res);

  const todoId: string = getIdFromRequestParams(req, res);

  const params: updateTodoParams =req.body;
  if(isEmptyObj(params)) {
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
  const userId = getUserIdFromRequest(req, res);

  const todoId: string = getIdFromRequestParams(req, res);

  try {
    // 削除処理
    await dbQueryHandler(deleteTodo, { userId, todoId });
    // 最新状態を返す
    const todos = await dbQueryHandler(getUserTodos, userId);
    res.status(200).json(todos);
  } catch(err) { next(err) }
}
