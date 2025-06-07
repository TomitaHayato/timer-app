import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { settingItems, SettingParams } from "../types/settingType";

type Props = {
  itemsNum: number,
  min: number,
  max: number,
  step: number,
  defaultVal: number,
  measureId: settingItems, // 設定項目名
  item: string,
  unit: string,
  register: UseFormRegister<SettingParams>,
  watch: UseFormWatch<SettingParams>,
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
  register,
  watch,
}: Props) {

  const itemValue = watch(measureId);

  return(
    <>
      <div className="w-full max-w-xs">
        <label htmlFor={`range-${measureId}`}>
          <span>{item}</span>
          <span className="font-semibold text-gray-300">{` ＜${itemValue}${unit}＞ `}</span>
        </label>

        <input
          id={`range-${measureId}`}
          type="range"
          min={min}
          max={max}
          defaultValue={defaultVal}
          className="range range-xs"
          step={step}
          // onChange={e => hundleChange(e.target.value)}
          { ...register(measureId) }
          />

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