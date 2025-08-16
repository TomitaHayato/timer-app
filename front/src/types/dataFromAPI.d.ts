import type { Setting } from "./settingType";
import type { Todos } from "./todoType";

export type UserData = {
  name: string,
  email: string,
  setting: Setting,
  todos: Todos,
}
