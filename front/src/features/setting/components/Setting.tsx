import { useForm } from "react-hook-form";
import { Measure } from "./Measure";
import type { SettingParams } from "../types/settingType";
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { selectSettingError, updateSetting } from "../Slices/settingSlice";

export function Setting() {
  const { register, watch, handleSubmit } = useForm<SettingParams>()
  const dispatch = useAppDispatch();
  const settingError = useAppSelector(selectSettingError);

  const onSubmit = async(data: SettingParams) => {
    const postSettingParams: SettingParams = {
      ...data,
      workSec: data.workSec * 60,
      restSec: data.restSec * 60,
      longRestSec: data.longRestSec * 60,
    }
    console.log('送信データ', postSettingParams);
    dispatch(updateSetting(postSettingParams)).unwrap();
  }

  return(
    <>
      <div>
        <h3 className="text-center text-2xl font-semibold mb-8">設定</h3>

        { settingError && <p className="text-center text-error">{settingError}</p> }

        {/* フォーム */}
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Measure
            itemsNum={11}
            min={10}
            max={60}
            defaultVal={25}
            step={5}
            measureId={'workSec'}
            item="作業時間"
            unit="分"
            register={register}
            watch={watch}/>

          <Measure
            itemsNum={10}
            min={1}
            max={10}
            defaultVal={5}
            step={1}
            measureId={'restSec'}
            item="休憩時間"
            unit="分"
            register={register}
            watch={watch}/>
          
          <Measure
            itemsNum={12}
            min={5}
            max={60}
            defaultVal={15}
            step={5}
            measureId={'longRestSec'}
            item="長期休憩"
            unit="分"
            register={register}
            watch={watch}/>

          <Measure
            itemsNum={11}
            min={0}
            max={100}
            defaultVal={50}
            step={10}
            measureId={'volume'}
            item="音量"
            unit=""
            register={register}
            watch={watch}/>

          <label className="label font-semibold text-gray-300">
            ミュート
            <input
              type="checkbox"
              className="checkbox mx-4"
              {...register('isMuted')}/>
          </label>

          <input type="submit" className="btn btn-info"/>
        </form>
      </div>
    </>
  )
}