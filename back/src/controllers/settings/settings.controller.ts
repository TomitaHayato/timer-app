import { NextFunction, Request, Response } from "express";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import { createSetting, getSettingByUserId, updateSetting } from "../../models/settings/settings";
import { isEmptyObj } from "../../utils/object";
import { PostSettingParams } from "../../types/setting";

export const getSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId = req.decodedJwtPayload;

  if(!userId) {
    res.status(422).json('無効なリクエストです');
    return;
  }

  try {
    const setting = await dbQueryHandler(getSettingByUserId, userId);
    res.status(200).json(setting);
  } catch(err) { next(err) }
}

export const postSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.decodedJwtPayload;
  const params: PostSettingParams = req.body;

  if (!userId || isEmptyObj(params)) {
    res.status(422).json('無効なリクエストです');
    return;
  }

  try {
    const setting = await dbQueryHandler(createSetting, { userId, params });
    res.status(200).json(setting);
  } catch(err) { next(err) }
}

export const putSetting = async(req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.decodedJwtPayload;
  const settingId: string = req.params.id;
  const params: PostSettingParams = req.body;

  if (!userId || !settingId || isEmptyObj(params)) {
    res.status(422).json('無効なリクエストです');
    return;
  }

  try {
    const setting = await dbQueryHandler(updateSetting, { settingId, userId, params });
    res.status(200).json(setting);
  } catch(err) { next(err) }
}
