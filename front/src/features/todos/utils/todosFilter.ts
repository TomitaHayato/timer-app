import type { Todos } from "../../../types/todoType"

export const filterByCompletedAt = (todos: Todos, startDate: Date, endDate?: Date): Todos => {
  if (!endDate) return todos.filter(todo => todo.completedAt === startDate);
  
  return todos.filter(todo => todo.completedAt && (todo.completedAt >= startDate || todo.completedAt <= endDate));
}

export const filterByDeadline = (todos: Todos, startDate: Date, endDate?: Date): Todos => {
  if (!endDate) return todos.filter(todo => todo.deadline === startDate);

  return todos.filter(todo => todo.deadline && (todo.deadline >= startDate || todo.deadline <= endDate));
}
