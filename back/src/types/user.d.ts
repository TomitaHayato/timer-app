export type User = {
  id: string,
  name: string,
  email: string,
}

export type UserWithRisk = {
  id: string,
  name: string,
  email: string,
  hashedPassword: string,
}

export type Users = User[]

export type NewUserPostParams = {
  name: string,
  email: string,
  hashedPassword: string,
}

export type UserUpdateParams = {
  name: string,
  email: string,
}
