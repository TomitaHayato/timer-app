import dayjs from "dayjs";
import type { Todo } from "../types/todoType";

export function sortTodosByDeadline(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    const aDeadline = a.deadline;
    const bDeadline = b.deadline;

    if (!aDeadline && bDeadline) return 1;
    if (aDeadline && !bDeadline) return -1;
    if (!aDeadline && !bDeadline) return 0;

    return dayjs(aDeadline).diff(dayjs(bDeadline), 'd')
  });
}
