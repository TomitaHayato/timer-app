export const ContactEmailHtmlBody = (params: { body: string, reply: boolean, email?: string | null }) => {
  const { body, email, reply } = params;

  return `
    <h3>返信： ${ reply ? "必要:" + email : "不要" }</h3>

    <h3>---- お問い合わせ内容 ----</h3>
    <p>${body}</p>
  `
}

export const ContactEmailTextBody = (params: { body: string, reply: boolean, email?: string | null }) => {
  const { body, email, reply } = params;
  return `
    返信： ${ reply ? "必要:" + email : "不要" }
    \n\n
    ---- お問い合わせ内容 ----
    \n
    ${body}
    \n\n\n
  `
}
