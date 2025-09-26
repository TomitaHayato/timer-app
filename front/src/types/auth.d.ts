export type User = {
  name: string,
  email: string,
}

export type AuthState = {
  user: User | null,
  isAuthenticated: boolean,
  csrfToken: string | null,
  loading: boolean,
  error: string | null,
}

export type SigninParams = {
  email: string,
  password: string,
}

export type SignupParams = {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}
