import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { settingItems, SettingParams } from "../../../types/settingType";
import { useAppSelector } from "../../../reduxStore/hooks";
import { selectSetting } from "../Slices/settingSlice";
import { useEffect } from "react";
import { selectAuthStatus } from "../../auth/slices/authSlice";
import { FormShortText } from "./formShortText";

type Props = {
  itemsNum: number, // 区切りの数
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
        { !isVolume && <FormShortText /> }
        <input
          id={`range-${measureId}`}
          type="range"
          min={min}
          max={max}
          className="range range-xs"
          step={step}
          { ...register(measureId) }
          disabled={!isVolume && !isAuth}/>

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