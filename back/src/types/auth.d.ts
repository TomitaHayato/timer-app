import { User } from "./user"

export type Auth = {
  user: User,
  isAuthenticated: boolean,
}

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
