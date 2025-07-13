export type passwordResetState = {
  tokenStatus:
    | 'idle'      // 初期状態
    | 'checking'  // 検証中 
    | 'valid'     // 有効
    | 'invalid'   // 無効
    | 'used',     // 使用済
  loading: boolean,
  error: string | null,
}

export type passwordResetToken = string

export type tokenAndIdForPasswordReset = {
  id: string,
  token: string,
}

export type paramsForPasswordUpdate = {
  id: string,
  token: string,
  password: string,
  passwordConfirmation: string,
}

export type passwordForgetParams = {
  email: string,
}