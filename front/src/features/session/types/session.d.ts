export type User = {
  name: string,
  email: string,
}

export type SessionState = {
  user: User | null,
  isAuthenticated: boolean,
  loading: boolean,
  error: string | null,
}

export type signinParams = {
  email: string,
  password: string,
}

export type SignupParams = {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}
