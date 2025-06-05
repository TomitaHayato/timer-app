export type User = {
  id: string,
  name: string,
  email: string,
}

export type Users = User[]

export type UserPostParams = {
  name: string,
  email: string,
  hashedPassword: string,
}

export type UserUpdateParams = {
  name?: string,
  email?: string,
}
