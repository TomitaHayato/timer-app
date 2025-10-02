export type ContactFormParams = {
  subject: string,
  reply: boolean,
  body: string,
}

export type ContactState = {
  loading: boolean,
  error: string | null,
}
