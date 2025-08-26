import type { Todo } from "../../../types/todoType"
import { memo, useState } from "react";
import { TodoItemInfo } from "./TodoItemInfo";
import { TodoItemEditForm } from "./TodoItemEditForm";

type Props ={
  todo: Todo,
}

function TodoItem({ todo }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return(
    <>
      {
        isEdit
        ? <TodoItemEditForm todo={todo} setIsEdit={setIsEdit}/>
        : <TodoItemInfo todo={todo} setIsEdit={setIsEdit}/>
      }
    </>
  )
}

export default memo(TodoItem);
