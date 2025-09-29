import { NextFunction, Request, Response } from "express";
import { dbQueryHandler } from "../../models/utils/queryErrorHandler";
import { createSetting, getSettingByUserId, updateSetting } from "../../models/settings/settings";
import { PostSettingParams } from "../../types/setting";
import { getUserIdFromJWT } from "../../middlewares/utils/getUserIdFromJwt";
import { devLog } from "../../utils/dev/devLog";
import { getRequestBody } from "../../middlewares/utils/getRequestBody";

export const getSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromJWT(req, res);

  try {
    const setting = await dbQueryHandler(getSettingByUserId, userId);
    res.status(200).json(setting);
  } catch(err) { next(err) }
}

export const postSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromJWT(req, res);

  const params = getRequestBody<PostSettingParams>(req, res);

  try {
    const setting = await dbQueryHandler(createSetting, userId, params);
    res.status(201).json(setting);
  } catch(err) { next(err) }
}

export const putSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromJWT(req, res);
  const params = getRequestBody<PostSettingParams>(req, res);

  try {
    devLog('パラメータ:', params)
    const setting = await dbQueryHandler(updateSetting, userId, params);
    res.status(200).json(setting);
  } catch(err) { 
    next(err)
    devLog('エラー：', err)
  }
}
