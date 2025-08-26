import { useState } from "react";
import type { Todo } from "../../../../types/todoType"
import { TodayTodoInfo } from "./TodayTodoInfo";
import { TodoItemEditForm } from "../TodoItemEditForm";

type Props = {
  todo: Todo,
}

export function TodayTodo({ todo }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return(
    <li className="mb-2">
      {
        isEdit
        ? <TodoItemEditForm todo={todo} setIsEdit={setIsEdit}/>
        : <TodayTodoInfo todo={todo} setIsEdit={setIsEdit} />
      }
    </li>
  )
}