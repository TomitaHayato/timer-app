import { randomUUID } from "crypto";
import { Auth } from "../../types/auth";
import { User } from "../../types/user";

export const defaultUser = (): User => ({
  id: randomUUID(),
  name: 'guest',
  email: 'default@email.com',
})

export const defaultAuth = (): Auth => ({
  user: defaultUser(),
  isAuthenticated: false,
})
