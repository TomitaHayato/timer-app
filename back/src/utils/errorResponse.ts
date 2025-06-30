const _createObjectWithError = (text: string) => {
  return { error: text }
}

// APIから返すエラーメッセージ一覧
export const ACCESS_TOKEN_EXPIRE_ERROR = _createObjectWithError('AccessTokenExpired')

export const INVALID_TOKEN_ERROR = _createObjectWithError('InvalidToken')

export const INVALID_REQUEST_BODY = _createObjectWithError('InvalidRequestBody');

export const INVALID_REFRESH_TOKEN = _createObjectWithError('InvalidRefreshToken')
