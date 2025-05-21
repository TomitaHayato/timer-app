import { secToHMS } from "../utils/secFormat";
import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from "react";
import { modeChange, selectCurrentSec } from "../timerSlice";
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { createExpiryTimestamp } from "../utils/expiryTimestamp";
import Records from "./Records";
import Drawer from "../../../components/Drawer";

export default function Timer() {
  const sec = useAppSelector(selectCurrentSec);
  const dispatch = useAppDispatch()

  // 初めてタイマーをスタートしたかどうか
  const [ isFirstStart, setIsFirstStart ] = useState<boolean>(true)
  
  // react-timer-hookから Timer情報を取得
  const {
    totalSeconds,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: createExpiryTimestamp(sec),
    autoStart: false,
    onExpire: () => {
      dispatch(modeChange());
    },
  });

  // 秒数更新後、タイマーをリスタート
  useEffect(() => {
    if (isFirstStart) return;
    restart(createExpiryTimestamp(sec))
  }, [isFirstStart, restart, sec])

  function hundleReset() {
    // const confirm = window.confirm('タイマーの記録がリセットされます。よろしいですか？');
    // if (!confirm) return;
    restart(createExpiryTimestamp(sec));
    pause();
  }

  function hundleStart() {
    if (!isFirstStart) {
      resume();
      return;
    }
    setIsFirstStart(false);
    start();
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
          <div className="border-2 border-indigo-600 rounded-full shadow-lg w-80 h-80 aspect-square mx-auto flex items-center justify-center mb-8">
            <p className="text-6xl">
              {secToHMS(totalSeconds)}
            </p>
          </div>
          {/* タイマー操作ボタン */}
          <div>
            <div className="flex justify-center items-center gap-8 mb-8">
              { isRunning
                ? <button className="btn btn-success btn-lg" onClick={pause}>ストップ</button>
                : <button className="btn btn-success btn-lg" onClick={hundleStart}>スタート</button>
              }
              <button className="btn btn-success btn-lg" onClick={hundleReset}>リセット</button>
            </div>
            <div className="flex justify-center">
              <button className="btn btn-success btn-lg">ここまでの作業時間を記録</button>
            </div>
          </div>
        </div>

        <div className="indicator">
          <span className="indicator-item status status-success animate-pulse"></span>
          <Drawer btnText={'記録を見る'}>
            <Records />
          </Drawer>
        </div>
      </div>
    </>
  )
}