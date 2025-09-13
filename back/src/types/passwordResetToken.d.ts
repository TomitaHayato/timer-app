export type emailForPasswordReset = {
  email: string,
}

export type passwordResetParams = {
  id: string,
  token: string,
  password: string,
}

export type PasswordResetToken = {
  id: string,
  userId: string,
  hashedToken: string,
  tokenExpiredIn: Date,
}
