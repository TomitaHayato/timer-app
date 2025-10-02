import nodemailer from 'nodemailer'
import { EmailInfo } from '../../types/mailer'
import { devLog } from '../../utils/dev/devLog'

const _transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail用の設定を自動反映(host, secure, port)
  // 認証情報
  auth: {
    user: "timerapp43506@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// メールサーバに接続できているかをCheck
export const verifyEmailConnection = async() => {
  try {
    await _transporter.verify();
    devLog('メール接続成功')
  } catch(err) {
    // 接続失敗でも、サーバは落とさない
    devLog('メール接続失敗：', err);
  }
};

// メール送信
export const sendEmail = async(emailInfo: EmailInfo) => {
  try {
    const result = await _transporter.sendMail(emailInfo);
    devLog('メール送信結果:', result);
    return result
  } catch(err) {
    devLog('メール送信失敗:', err);
    throw new Error('メールの送信に失敗しました');
  }
}
