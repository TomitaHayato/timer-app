import type { Todo } from "../../../../types/todoType"

type Props = {
  todo: Todo,
}

export function TodayTodo({todo}: Props) {
  const titleClass = todo.completedAt ? "text-gray-400" : "text-green-500"

  return(
    <>
      <div className="py-1 px-2">
        <p className={titleClass}>{todo.title}</p>
      </div>
    </>
  )
}