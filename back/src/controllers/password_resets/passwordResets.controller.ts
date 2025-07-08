import { NextFunction, Request, Response } from "express"
import { getRequestBody } from "../utils/getRequestBody"
import { emailForPasswordReset } from "../../types/passwordResetToken";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import { getUserByEmail } from "../../models/users/users";
import { randomUUID } from "crypto";
import { dataHash } from "../../utils/dataHash";
import { createPasswordResetTokenByUserId } from "../../models/passwordResetToken/passwordResetToken.model";
import { EmailInfo } from "../../config/mailer/mailer";
import { passwordResetEmailBody } from "../../config/mailer/templates/password_reset/text_body.";
import { passwordResetEmailHtmlBody } from "../../config/mailer/templates/password_reset/html_body";
import { sendEmail } from "../../config/mailer/transporter";
import { devLog } from "../../utils/dev/devLog";

// reqからemail取得 => トークン生成 + メール送信
export const sendEmailForPasswordReset = async(req: Request, res: Response, next: NextFunction) => {
  const { email } = getRequestBody<emailForPasswordReset>(req, res);

  try {
    // emailからUser取得
    const user = await dbQueryHandler(getUserByEmail, email);
    if(!user) {
      res.status(422).json('登録されていないメールアドレスです');
      return
    }

    // UserのPasswordResetTokenレコードを作成
    const token = randomUUID();
    const hashedToken = await dataHash(token);
    await dbQueryHandler(createPasswordResetTokenByUserId, {
      userId: user.id,
      hashedToken,
    });

    // メール送信
    const queryParams = `?token=${token}`;
    const resetLink = process.env.CLIENT_ORIGIN + queryParams
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

// reqからtoken, password, passwordConfirmationを取得 => Token検証 => パスワード変更 + トークン失効
export const resetPassword = async() => {}
