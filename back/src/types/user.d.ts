import { Records } from "./record"
import { Setting } from "./setting"
import { Todos } from "./todo"

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

export type UserRelations = {
  id: string,
  name: string,
  email: string,
  setting?: Setting,
  todos?: Todos,
  records?: Records
}
