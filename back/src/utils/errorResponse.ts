const _createObjectWithError = (text: string) => { error: text }

export const ACCESS_TOKEN_EXPIRE_ERROR = _createObjectWithError('AccessTokenExpired')

export const INVALID_TOKEN_ERROR = _createObjectWithError('InvalidToken')
