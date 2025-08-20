import dayjs from "dayjs";

export const deadlineText = (deadline: Date): string => {
  const diff = dayjs().diff(dayjs(deadline), 'd');
  if (diff > 0) {
    return 'text-red-400 text-sm font-semibold';
  } else if (diff === 0) {
    return 'text-warning text-sm font-semibold';
  } else {
    return 'text-green-500 text-sm font-semibold';
  }
}

export const selectedTodoClass = (simpleBg: boolean) => {
  if(simpleBg) return "bg-gray-600 rounded-xl shadow-xl";
  return "bg-gray-100/60 text-gray-800 rounded-xl shadow-xl";
}