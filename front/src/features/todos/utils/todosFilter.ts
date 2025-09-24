import type { Todos } from "../../../types/todoType"
import { diffDate } from "../../../utils/time";

export const filterByCompletedAt = (todos: Todos, startDate: Date, endDate?: Date): Todos => {
  if (!endDate) return todos.filter(todo => todo.completedAt === startDate);
  
  return todos.filter(todo => todo.completedAt && (diffDate(todo.completedAt, startDate) >= 0 || diffDate(todo.completedAt, endDate) <= 0));
}

export const filterByDeadline = (todos: Todos, startDate: Date, endDate?: Date): Todos => {
  if (!endDate) return todos.filter(todo =>  todo.deadline && diffDate(todo.deadline, startDate) === 0);

  return todos.filter(todo => todo.deadline && (diffDate(todo.deadline, startDate) >= 0 || diffDate(todo.deadline, endDate) <= 0));
}
