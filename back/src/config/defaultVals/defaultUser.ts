import { Auth } from "../../types/auth";
import { User } from "../../types/user";
import crypt from 'crypto';

export const defaultUser: User = {
  id: crypt.randomUUID(),
  name: 'guest',
  email: '',
}

export const defaultAuth: Auth = {
  user: defaultUser,
  isAuthenticated: false,
}
