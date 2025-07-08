export type passwordResetState = {
  token: passwordResetToken,
  loading: boolean,
  error: string | null,
}

export type passwordResetToken = string | null

export type passwordForgetParams = {
  email: string,
}