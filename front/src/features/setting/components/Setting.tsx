import { useForm } from "react-hook-form";
import { Measure } from "./Measure";
import type { SettingParams } from "../types/settingType";
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { replaceSetting, selectSettingState, updateSetting } from "../Slices/settingSlice";
import { selectAuthStatus } from "../../session/slices/sessionSlice";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { devLog } from "../../../utils/logDev";
import { LoadingSpans } from "../../../components/btn/LoadingSpans";
import { FormShortText } from "./formShortText";
import { selectTimer } from "../../timer/timerSlice";
import { UserDeleteBtn } from "./UserDeletebtn";

export function Setting() {
  const { register, watch, handleSubmit, setValue } = useForm<SettingParams>()

  const isAuth = useAppSelector(selectAuthStatus);
  const timerStatus = useAppSelector(selectTimer).status;
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector(selectSettingState);

  const onSubmit = async(data: SettingParams) => {
    if (loading) return;

    // 入力値の秒数を分数に変更
    const postSettingParams: SettingParams = {
      ...data,
      workSec: data.workSec * 60,
      restSec: data.restSec * 60,
      longRestSec: data.longRestSec * 60,
    }
    devLog('送信データ', postSettingParams);

    try {
      // TODO: 設定変更後、引き出しを閉じたい
      if(isAuth) {
        dispatch(updateSetting(postSettingParams));
      } else {
        dispatch(replaceSetting(postSettingParams));
      }
      toastSuccessRB('設定を更新しました');
    } catch {
      toastErrorRB('設定の更新に失敗しました')
    }
  }

  return(
    <>
      <div>
        <h3 className="text-center text-2xl font-semibold mb-8">設定</h3>

        { error && <p className="text-center text-error">{error}</p> }

        {/* フォーム */}
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Measure
            itemsNum={11}
            min={10}
            max={60}
            step={5}
            measureId={'workSec'}
            item="作業時間"
            unit="分"
            register={register}
            watch={watch}
            setValue={setValue}/>

          <Measure
            itemsNum={10}
            min={1}
            max={10}
            step={1}
            measureId={'restSec'}
            item="休憩時間"
            unit="分"
            register={register}
            watch={watch}
            setValue={setValue}/>
          
          <Measure
            itemsNum={12}
            min={5}
            max={60}
            step={5}
            measureId={'longRestSec'}
            item="長期休憩"
            unit="分"
            register={register}
            watch={watch}
            setValue={setValue}/>

          <Measure
            itemsNum={11}
            min={0}
            max={100}
            step={10}
            measureId={'volume'}
            item="音量"
            unit=""
            register={register}
            watch={watch}
            setValue={setValue}/>

          <div>
            <label className="label font-semibold text-gray-300 mb-1">
              ミュート
              <input
                type="checkbox"
                className="checkbox mx-4"
                {...register('isMuted')}/>
            </label>
            <p className="text-[0.65rem] text-gray-400">※ 保存ボタンを押すと反映されます</p>
          </div>

          <div>
            <label htmlFor="sound-select">集中時の音楽</label>
            <FormShortText />
            <select
              id="sound-select"
              defaultValue="default"
              className="select select-primary"
              disabled={!isAuth}
              { ...register('workingSound') }>
              <option value="default">蝉の声</option>
              <option value="wind_bell">風鈴</option>
            </select>
          </div>

          <div className="text-center">
            { timerStatus && <p className="text-sm text-error">タイマーを停止する必要があります</p> }
            {
              loading
              ? <button type="button" className="btn btn-info btn-wide mb-1"><LoadingSpans /></button>
              : <input type="submit" className="btn btn-info btn-wide mb-1" value={isAuth ? '保存' : '適用する'} disabled={timerStatus}/>
            }
          </div>
        </form>

        <div className="text-center my-8">
          <p className="text-gray-400">ユーザー削除</p>
          <UserDeleteBtn />
        </div>
      </div>
    </>
  )
}