import { NextFunction, Request, Response } from "express";
import { getCsrfTokenFromReponseHeader, verifyCsrfToken } from "../utils/csrf";
import { devLog } from "../../utils/dev/devLog";
import { getUserIdFromJWT } from "../utils/getUserIdFromJwt";
import { getCsrfSecret } from "../../models/csrfSecret/csrfSecret.model";
import { dbQueryHandler } from "../../models/utils/queryErrorHandler";

// 認証確認 MiddleWareの後に配置する
export const verifyCsrfTokenMiddleware = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const csrfToken = getCsrfTokenFromReponseHeader(req);
    if (!csrfToken) {
      // devLog('csrfトークンがない')
      res.status(403).json('csrfトークンがありません');
      return;
    }

    // secretをDBから取得
    const userId = getUserIdFromJWT(req, res);
    const csrfSecret = await dbQueryHandler(getCsrfSecret, userId);
    if (!csrfSecret) {
      // 認証は完了しているが、csrfSecretがDBに存在しない場合（不測の事態）;
      // devLog('不測の事態')
      res.status(403).json("再度ログインしてください");
      return;
    }

    // トークン検証
    if (!verifyCsrfToken({ token: csrfToken, secret: csrfSecret.secret })) {
      // devLog('csrf Token検証失敗')
      res.status(403).json("権限がありません");
      return;
    }

    next();
  } catch(err) {
    devLog('csrfトークン検証エラー：', err);
    next(err);
  }
}