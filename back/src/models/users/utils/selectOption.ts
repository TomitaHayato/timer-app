import { Prisma } from "../../../../generated/prisma";
import { selectSetting } from "../../settings/utils/selectOption";
import { selectTodo } from "../../todos/utils/selectOption";

export const selectUserColumnsWithId = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
});

export const selectUserColumnsMini = Prisma.validator<Prisma.UserSelect>()({
  name: true,
  email: true,
});

export const selectUserColumnsWithIdAndPass = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  hashedPassword: true,
});

export const selectUserWithSettingAndTodos = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    ...selectUserColumnsWithId,
    todos: selectTodo,
    setting: selectSetting,
  }
})

export type UserWithSettingAndTodos = Prisma.UserGetPayload<typeof selectUserWithSettingAndTodos>