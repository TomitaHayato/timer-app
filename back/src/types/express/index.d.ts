import 'express'

// Request型を上書き
declare module 'express-serve-static-core' {
  interface Request {
    isAuthenticated?: boolean,
  }
}
