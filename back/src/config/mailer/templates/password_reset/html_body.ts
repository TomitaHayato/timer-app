export const passwordResetEmailHtmlBody = (resetLink: string) => {
  return `
    <p>以下のリンクをクリックして、パスワードの再設定を行ってください。</p>
    <p>
      <a href="${resetLink}" target="_blank">パスワードを再設定する</a>
    </p>
    <p><strong>※ このリンクの有効期限は30分です。</strong></p>
    <hr />
    <p>もしこのメールに心当たりがない場合は、このまま無視してください。</p>
  `
}