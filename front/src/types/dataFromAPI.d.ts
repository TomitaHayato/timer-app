import type { Setting } from "../features/setting/types/settingType";
import type { Todos } from "../features/todos/types/todoType";

export type UserData = {
  name: string,
  email: string,
  setting: Setting,
  todos: Todos,
}
