import { secToHMS } from "../utils/secFormat";
import { useTimer } from 'react-timer-hook';
import { useState } from "react";
import { selectTimer } from "../timerSlice";
import { useAppSelector } from "../../../reduxStore/hooks";

export default function Timer() {
  const { workSec } = useAppSelector(selectTimer);

  const [ isFirstStart, setIsFirstStart ] = useState<boolean>(true)

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + workSec);
  // react-timer-hookから Timer情報を取得
  const {
    totalSeconds,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: false});

  function hundleReset() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + workSec);
    restart(time);
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
      <div>
        <div>
          {/* 円状のコンテナ */}
          <div className="border-2 border-emerald-500 rounded-full shadow-lg w-80 h-80 aspect-square mx-auto flex items-center justify-center mb-8">
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
      </div>

      {/* Todo一覧 */}
    </>
  )
}