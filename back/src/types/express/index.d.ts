// import 'express'

// Request型を上書き
declare namespace Express {
  interface Request {
    isAuthenticated: boolean | undefined,
    decodedJwtPayload?: JwtPayload,
  }
}
