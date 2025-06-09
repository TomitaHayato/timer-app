import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { settingItems, SettingParams } from "../types/settingType";
import { useAppSelector } from "../../../reduxStore/hooks";
import { selectSetting } from "../Slices/settingSlice";
import { useEffect } from "react";
import { selectAuthStatus } from "../../session/slices/sessionSlice";

type Props = {
  itemsNum: number,
  min: number,
  max: number,
  step: number,
  measureId: settingItems, // 設定項目名
  item: string,
  unit: string,
  register: UseFormRegister<SettingParams>,
  watch: UseFormWatch<SettingParams>,
  setValue: UseFormSetValue<SettingParams>,
}

export function Measure({
  itemsNum,
  min,
  max,
  step,
  measureId,
  item,
  unit,
  register,
  watch,
  setValue,
}: Props) {
  const isAuth = useAppSelector(selectAuthStatus);
  const itemValue = watch(measureId); // フォームの入力値
  const valueInStore = useAppSelector(selectSetting)[measureId]; // Reduxストア内の値
  const isVolume = measureId === 'volume';

  // Reduxストアの値変更後、フォームのValueも変更
  useEffect(() => {
    if (isVolume) {
      setValue(measureId, valueInStore);
      return;
    } else {
      const minutes = Math.floor(valueInStore / 60);
      setValue(measureId, minutes)
    } 
  }, [valueInStore, setValue, measureId, isVolume])

  return(
    <>
      <div className="w-full max-w-xs">
        <label htmlFor={`range-${measureId}`}>
          <span>{item}</span>
          <span className="font-semibold text-gray-300">{` ＜${itemValue}${unit}＞ `}</span>
        </label>
        <p className="text-[0.65rem] text-gray-400">※ 保存ボタンを押すと反映されます</p>
        <input
          id={`range-${measureId}`}
          type="range"
          min={min}
          max={max}
          defaultValue={valueInStore}
          className="range range-xs"
          step={step}
          // onChange={e => hundleChange(e.target.value)}
          { ...register(measureId) }
            disabled={!isVolume && !isAuth}
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