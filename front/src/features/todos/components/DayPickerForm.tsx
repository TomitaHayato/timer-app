import { DayPicker } from "react-day-picker";
import type { ControllerRenderProps } from "react-hook-form";
import type { TodoAddParams } from "../../../types/todoType";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

type Props = {
  field: ControllerRenderProps<TodoAddParams, "deadline">
}

export function DayPickerForm({field}: Props) {
  const [showCalender, setShowCalender] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  function closeCalender(e: MouseEvent): void {
    if (ref && !ref.current?.contains(e.target as Node)) setShowCalender(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeCalender);
    return () => document.removeEventListener("mousedown", closeCalender);
  }, [ref])

  return(
    <>
      <button type="button" className="input input-sm px-6 rounded-xl" onClick={() => setShowCalender(!showCalender)}>
        { field.value ? dayjs(field.value).format('YYYY年 MM月DD日') : "Todoの期限を指定" }
      </button>

      {
        showCalender && 
        <div className="absolute z-30 right-12 bottom-12" ref={ref}>
          <DayPicker
            showOutsideDays
            mode="single"
            className="react-day-picker text-base bg-green-900"
            selected={field.value}
            onSelect={value => {
              field.onChange(value);
              setShowCalender(false);
            }}
          />
        </div>
      }
    </>
  )
}
