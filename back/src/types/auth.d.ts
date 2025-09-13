import { User } from "./user"

export type signupParams = {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

export type signinParams = {
  email: string,
  password: string,
}

export type jwtPayload = {
  userId: string,
}
