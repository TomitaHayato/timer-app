import { NextFunction, Request, Response } from "express"
import { dbQueryHandler } from "../../models/utils/queryErrorHandler";
import { createRecord } from "../../models/records/records";
import { devLog } from "../../utils/dev/devLog";
import { getUserIdFromJWT } from "../utils/getUserIdFromJwt";
import { getRequestBody } from "../utils/getRequestBody";
import { postRecordParams } from "../../types/record";
import { getRecordsFromDB } from "../../services/records.service";

// 期間ごとに集計したRecordsの配列を返す
export const recordsIndex = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromJWT(req, res);

  // 期間指定をリクエストから取得
  const daysAgo: number = req.body.daysAgo || 0;
  const weeksAgo: number = req.body.weeksAgo || 0;
  const monthsAgo: number = req.body.monthsAgo || 0;

  try {
    const records = await getRecordsFromDB(userId, daysAgo, weeksAgo, monthsAgo);
    devLog('レコード一覧:', records);
    res.status(200).json(records);
  } catch(err) { next(err) }
}


// 作成処理
export const postRecord = async(req: Request, res: Response) => {
  const userId = getUserIdFromJWT(req, res);
  // リクエストからパラメータを取得
  const params = getRequestBody<postRecordParams>(req, res);

  // 作成処理
  await dbQueryHandler(createRecord, userId, params);
  // 最新状態を返却（最新状態の取得時に、指定された期間はリセットされる）
  const records = await getRecordsFromDB(userId, 0, 0, 0);
  res.status(201).json(records);
}

