import { Prisma } from "../../../../generated/prisma";

export const selectTodoColumns = Prisma.validator<Prisma.TodoSelect>()({
  id: true, 
  title: true,
  deadline: true,
  isCompleted: true,
  completedAt: true,
});

export const selectTodo = Prisma.validator<Prisma.TodoDefaultArgs>()({
  select: selectTodoColumns,
});
