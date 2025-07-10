export type passwordResetState = {
  tokenStatus: 'idle' | 'checking' | 'valid' | 'invalid',
  loading: boolean,
  error: string | null,
}

export type passwordResetToken = string

export type passwordForgetParams = {
  email: string,
}