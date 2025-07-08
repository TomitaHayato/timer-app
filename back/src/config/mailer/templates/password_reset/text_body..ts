export const passwordResetEmailBody = (resetLink: string) => {
  return `
    以下のリンクをクリックして、パスワードの再設定を行ってください。
    \n
    \n
    ${resetLink}
    \n
    \n
    ※ このリンクの有効期限は30分です。
    \n
    \n
    もしこのメールに心当たりがない場合は、何もせずに破棄してください。
  `
}
