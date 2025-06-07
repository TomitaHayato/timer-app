import { NextFunction, Request, Response } from "express";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import { createSetting, getSettingByUserId, updateSetting } from "../../models/settings/settings";
import { isEmptyObj } from "../../utils/object";
import { PostSettingParams } from "../../types/setting";
import { getUserIdFromRequest } from "../utils/getUserId";
import { getIdFromRequestParams } from "../utils/getIdFromRequestParams";

export const getSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromRequest(req, res);
  if (!userId) return;

  try {
    const setting = await dbQueryHandler(getSettingByUserId, userId);
    res.status(200).json(setting);
  } catch(err) { next(err) }
}

export const postSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromRequest(req, res);
  if (!userId) return;

  const params: PostSettingParams = req.body;

  if (isEmptyObj(params)) {
    res.status(422).json('無効なリクエストです');
    return;
  }

  try {
    const setting = await dbQueryHandler(createSetting, { userId, params });
    res.status(200).json(setting);
  } catch(err) { next(err) }
}

export const putSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromRequest(req, res);
  if (!userId) return;

  const params: PostSettingParams = req.body;
  if (isEmptyObj(params)) {
    res.status(422).json('無効なリクエストです');
    return;
  }

  try {
    const setting = await dbQueryHandler(updateSetting, { userId, params });
    res.status(200).json(setting);
  } catch(err) { next(err) }
}
