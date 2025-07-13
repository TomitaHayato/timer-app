import { NextFunction, Request, Response } from "express"
import { getRequestBody } from "../utils/getRequestBody"
import { emailForPasswordReset, passwordResetParams } from "../../types/passwordResetToken";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import { getUserByEmail } from "../../models/users/users";
import { randomUUID } from "crypto";
import { dataHash } from "../../utils/dataHash";
import { createPasswordResetTokenByUserId, updateUserPasswordAndDeleteResetToken, verifyPasswordResetToken } from "../../models/passwordResetToken/passwordResetToken.model";
import { EmailInfo } from "../../config/mailer/mailer";
import { passwordResetEmailBody } from "../../config/mailer/templates/password_reset/text_body.";
import { passwordResetEmailHtmlBody } from "../../config/mailer/templates/password_reset/html_body";
import { sendEmail } from "../../config/mailer/transporter";
import { devLog } from "../../utils/dev/devLog";
import { getEnvValue } from "../../utils/handleENV";
import { INVALID_TOKEN_ERROR } from "../../utils/errorResponse";

// reqからemail取得 => トークン生成 + メール送信
export const sendEmailForPasswordReset = async(req: Request, res: Response, next: NextFunction) => {
  const { email } = getRequestBody<emailForPasswordReset>(req, res);

  try {
    // emailからUser取得
    const user = await dbQueryHandler(getUserByEmail, email);
    if(!user) {
      devLog('登録されていないメールアドレスです');
      next('申請できませんでした');
      return
    }

    // UserのPasswordResetTokenレコードを作成
    const token = randomUUID();
    const hashedToken = await dataHash(token);
    const tokenInDB = await dbQueryHandler(createPasswordResetTokenByUserId, {
      userId: user.id,
      hashedToken,
    });

    // メール送信
    const urlParams = `?token=${token}&id=${tokenInDB.id}`;
    const resetLink = getEnvValue('CLIENT_ORIGIN') + getEnvValue('PASSWORD_RESET_PATH') + urlParams
    const emailInfo: EmailInfo = {
      to: user.email,
      subject: "[Timer] パスワードリセット申請",
      text: passwordResetEmailBody(resetLink),
      html: passwordResetEmailHtmlBody(resetLink),
    }
    await sendEmail(emailInfo);

    res.status(200).json('パスワードリセット申請メールを送信しました')
  } catch(err) {
    devLog('sendEmailForPasswordResetのエラー：', err);
    next(err);
  }
}

// トークン検証
export const tokenCheck = async(req: Request, res: Response, next: NextFunction) => {
  const { id, token } = getRequestBody<passwordResetParams>(req, res);

  try {
    const isTokenValid = await verifyPasswordResetToken(id, token); // トークンの検証
    if(!isTokenValid) {
      res.status(403).json(INVALID_TOKEN_ERROR);
      return;
    }
    res.status(200).json();
  } catch(err) {
    devLog('passwordResetToken検証エラー：', err);
    next(err);
  }
}

// reqからtoken, password, passwordConfirmationを取得 => Token検証 => パスワード変更 + トークン失効
export const resetPassword = async(req: Request, res: Response, next: NextFunction) => {
  const {
    id,
    token,
    password,
  } = getRequestBody<passwordResetParams>(req, res);
  
  try {
    // トークン検証
    const tokenInDB = await verifyPasswordResetToken(id, token);
    if(!tokenInDB) {
      res.status(403).json(INVALID_TOKEN_ERROR);
      return;
    }

    // パスワードリセット処理
    const hashedPassword = await dataHash(password);
    await dbQueryHandler(updateUserPasswordAndDeleteResetToken, { userId: tokenInDB.userId, hashedPassword });

    devLog('パスワード更新完了');
    res.status(200).json('パスワードを更新しました');
  } catch(err) {
    devLog('Userパスワード更新失敗：', err);
    next(err);
  }
}
