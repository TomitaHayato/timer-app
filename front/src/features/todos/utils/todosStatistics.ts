import type { Todos } from "../../../types/todoType"

export const calcCompletedTodosPercentage = (todos: Todos): number => {
  const allTodosLen = todos.length;
  if (allTodosLen === 0) return 0;

  return Math.floor((todos.filter(todo => todo.isCompleted).length * 100) / allTodosLen);
}
