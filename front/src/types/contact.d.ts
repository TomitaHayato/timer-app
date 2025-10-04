export type ContactFormParams = {
  subject: string,
  reply: string,
  body: string,
  email?: string,
}

export type ContactState = {
  loading: boolean,
  error: string | null,
}
