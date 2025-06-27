import { NextFunction, Request, Response } from "express";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import { createSetting, getSettingByUserId, updateSetting } from "../../models/settings/settings";
import { isEmptyObj } from "../../utils/object";
import { PostSettingParams } from "../../types/setting";
import { getUserIdFromRequest } from "../utils/getUserId";
import { devLog } from "../../utils/dev/devLog";
import { getRequestBody } from "../utils/getRequestBody";

export const getSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromRequest(req, res);

  try {
    const setting = await dbQueryHandler(getSettingByUserId, userId);
    res.status(200).json(setting);
  } catch(err) { next(err) }
}

export const postSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromRequest(req, res);

  const params = getRequestBody<PostSettingParams>(req, res);

  try {
    const setting = await dbQueryHandler(createSetting, { userId, params });
    res.status(200).json(setting);
  } catch(err) { next(err) }
}

export const putSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromRequest(req, res);
  const params = getRequestBody<PostSettingParams>(req, res);

  try {
    devLog('パラメータ:', params)
    const setting = await dbQueryHandler(updateSetting, { userId, params });
    res.status(200).json(setting);
  } catch(err) { 
    next(err)
    devLog('エラー：', err)
  }
}
