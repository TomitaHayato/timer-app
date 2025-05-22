import { useState } from "react"

type Props = {
  itemsNum: number,
  min: number,
  max: number,
  step: number,
  defaultVal: number,
  measureId: string,
  item: string,
  unit: string
}

export function Measure({
  itemsNum,
  min,
  max,
  step,
  defaultVal,
  measureId,
  item,
  unit,
}: Props) {

  const [val, setVal] = useState<number>(defaultVal);

  function hundleChange(v: string) {
    setVal(Number(v));
  }

  return(
    <>
      <div className="w-full max-w-xs">
        <label htmlFor={`range-${measureId}`}>
          <span>{item}</span>
          <span className="font-semibold text-gray-300">{` ＜${val}${unit}＞ `}</span>
        </label>

        <input
          id={`range-${measureId}`}
          type="range"
          min={min}
          max={max}
          defaultValue={defaultVal}
          className="range range-xs"
          step={step}
          onChange={e => hundleChange(e.target.value)} />

        <div className="flex justify-between px-2.5 mt-1 text-[0.5rem]">
          { [...Array(itemsNum)].map((_, i) => <span key={`separator-${i}-${measureId}`}>|</span>) }
        </div>

        <div className="flex justify-between px-2.5 mt-1 text-[0.7rem]">
          {
            [...Array(itemsNum)].map((_, index) => {
              return <span key={`scale-${index}-${measureId}`}>{ min + step * index }</span>
            })
          }
        </div>
      </div>
    </>
  )
}