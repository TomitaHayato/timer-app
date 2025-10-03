import { NextFunction, Request, Response } from "express";
import { EmailInfo } from "../../types/mailer";
import { getRequestBody } from "../../middlewares/utils/getRequestBody";
import { ContactParams } from "../../types/contact";
import { ContactEmailHtmlBody, ContactEmailTextBody } from "../../config/mailer/templates/contact/body";
import { sendEmail } from "../../config/mailer/transporter";
import { devLog } from "../../utils/dev/devLog";

export const sendContact = async(req: Request, res: Response, next: NextFunction) => {
  const { subject, reply, body, email } = getRequestBody<ContactParams>(req, res);
  try {
    const emailInfo: EmailInfo = {
      to: "timerapp43506@gmail.com",
      subject,
      text: ContactEmailTextBody({ body, reply, email }),
      html: ContactEmailHtmlBody({ body, reply, email }),
    }
    await sendEmail(emailInfo);
    res.status(200).json('お問い合わせメールを送信しました');
  } catch(err) {
    devLog('sendContactエラー：', err);
    next(err);
  }
}
