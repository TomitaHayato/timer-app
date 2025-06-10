import { secToHMS } from "../../../utils/secFormat";
import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from "react";
import { modeChange, selectTimer, switchTimer } from "../timerSlice";
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { createExpiryTimestamp } from "../utils/expiryTimestamp";
import { selectSetting } from "../../setting/Slices/settingSlice";
import { getModeSec } from "../utils/getModeSec";
import { modeText } from "../utils/modeText";
import { modeBorderColor, modeTextColor } from "../utils/class";
import { toastSuccessRB } from "../../../utils/toast";

export default function Timer() {
  const { workSec, restSec, longRestSec } = useAppSelector(selectSetting);
  const { mode } = useAppSelector(selectTimer);
  const dispatch = useAppDispatch()

  // 初めてタイマーをスタートしたかどうか
  const [ isFirstStart, setIsFirstStart ] = useState<boolean>(true);

  // react-timer-hookから Timer情報を取得
  const {
    totalSeconds,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: createExpiryTimestamp(getModeSec(mode, { workSec, restSec, longRestSec })),
    autoStart: false,
    onExpire: () => {
      dispatch(modeChange(workSec));
    },
  });

  // isRunningをステートに反映
  useEffect(() => {
    dispatch(switchTimer(isRunning));
  }, [dispatch, isRunning])


  // 秒数更新後、タイマーをリスタート
  // 問題点：
    // 1: 更新後すぐにカウントが反映されてしまうこと
    // 2: 更新後スタートしてしまうこと
    // 3: 更新後にpauseしようとすると、Mode切り替え後もPauseしてしまうこと
  useEffect(() => {
    if (isFirstStart) return; // 初回レンダリング時は何もしない
    restart(createExpiryTimestamp(getModeSec(mode, { workSec, restSec, longRestSec })))
  }, [isFirstStart, longRestSec, restSec, restart, mode, workSec])


  function handleReset() {
    restart(createExpiryTimestamp(getModeSec(mode, { workSec, restSec, longRestSec })));
    pause();
    toastSuccessRB('タイマー リセット', { autoClose: 1500 })
  }

  function handleStart() {
    toastSuccessRB('タイマー スタート', { autoClose: 1500 })
    if (!isFirstStart) {
      resume();
      return;
    }
    setIsFirstStart(false);
    start();
  }

  function handlePause() {
    toastSuccessRB('タイマー ストップ', { autoClose: 1500 })
    pause();
  }

  return(
    <>
      <div className="py-8">
        <div>
          {/* Todoを表示 */}
          <div className="join flex gap-4 justify-center items-center mb-8">
            <p>・</p>
            <h3 className="text-3xl text-center">Typescript演習</h3>
            <button className="btn btn-sm btn-success rounded-full">✔︎</button>
          </div>
          
          {/* 円状のコンテナ */}
          <div className={`border-2 rounded-full shadow-lg w-80 h-80 aspect-square mx-auto flex flex-col items-center justify-center mb-8 ${modeBorderColor(mode)}`}>
            <p className={modeTextColor(mode)}>{modeText(mode)}</p>
            <p className={`text-7xl font-semibold ${modeTextColor(mode)}`}>
              {secToHMS(totalSeconds)}
            </p>
          </div>
          {/* タイマー操作ボタン */}
          <div>
            <div className="flex justify-center items-center gap-8 mb-8">
              { isRunning
                ? <button className="btn btn-success btn-lg" onClick={handlePause}>ストップ</button>
                : <button className="btn btn-success btn-lg" onClick={handleStart}>スタート</button>
              }
              <button className="btn btn-success btn-lg" onClick={handleReset}>リセット</button>
            </div>
            <div className="flex justify-center">
              <button className="btn btn-success btn-lg">ここまでの作業時間を記録</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}