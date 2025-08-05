import { diffDate } from "../../../utils/time";
import type { Todos } from "../types/todoType";

export const sortTodosDescByCompletedAt = (todos: Todos) => {
  const sortedTodos = todos.sort((a, b) => {
    if (!a.completedAt || !b.completedAt) return 0;
    return diffDate(b.completedAt, a.completedAt); // 降順
  })

  return sortedTodos;
}

export const sortTodosAscByDeadline = (todos: Todos) => {
  const sortedTodos = todos.sort((a, b) => {
    if (!a.deadline || !b.deadline) return 0;
    return diffDate(a.deadline, b.deadline); // 降順
  })

  return sortedTodos;
}
