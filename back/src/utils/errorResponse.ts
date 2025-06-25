const _createObjectWithError = (text: string) => {
  return { error: text }
}

export const ACCESS_TOKEN_EXPIRE_ERROR = _createObjectWithError('AccessTokenExpired')

export const INVALID_TOKEN_ERROR = _createObjectWithError('InvalidToken')

export const INVALID_REQUEST_BODY = _createObjectWithError('InvalidRequestBody');

