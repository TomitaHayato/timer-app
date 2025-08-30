import { DayPicker } from "react-day-picker";
import type { ControllerRenderProps } from "react-hook-form";
import type { TodoAddParams } from "../../../types/todoType";
import dayjs from "dayjs";
import { useState } from "react";

type Props = {
  field: ControllerRenderProps<TodoAddParams, "deadline">
}

export function DayPickerForm({field}: Props) {
  const [show, setShow] = useState<boolean>(false);

  return(
    <>
      <button type="button" className="input input-sm px-6 rounded-xl" onClick={() => setShow(!show)}>
        { field.value ? dayjs(field.value).format('YYYY年 MM月DD日') : "Todoの期限を指定" }
      </button>

      <div className={show ? "" : "hidden"}>
        <div className="absolute z-30 right-12 bottom-12">
          <DayPicker
            mode="single"
            className="react-day-picker text-base bg-indigo-900"
            selected={field.value}
            onSelect={value => {
              field.onChange(value);
              setShow(false);
            }}
          />
        </div>
      </div>
    </>
  )
}
