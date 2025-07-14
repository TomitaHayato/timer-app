import { secToHMS } from "../../../utils/secFormat";
import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from "react";
import { modeChange, modeChangeForth, selectTimer, switchTimer } from "../timerSlice";
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { createExpiryTimestamp } from "../utils/expiryTimestamp";
import { selectSetting } from "../../setting/Slices/settingSlice";
import { getModeSec } from "../utils/getModeSec";
import { modeText } from "../utils/modeText";
import { modeBarColor, modeTextColor, sceneTimerBgColor } from "../utils/class";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { useSoundHowls } from "../hooks/soundSet";
import { devLog } from "../../../utils/logDev";
import { createRecord } from "../../records/recordsSlice";
import type { PostRecordParams } from "../../records/types/records";
import { selectAuthStatus } from "../../session/slices/sessionSlice";
import { selectVisibleClass } from "../../display/visibleSlice";
import type { TimerMode } from "../types/timerType";

export default function Timer() {
  const isAuth = useAppSelector(selectAuthStatus);
  const { workSec, restSec, longRestSec } = useAppSelector(selectSetting);
  const { mode, count } = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();
  const visibleCalss = useAppSelector(selectVisibleClass);

  const { soundWork, soundBtn, soundRest } = useSoundHowls();

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
      soundWork?.current?.stop();
      if(mode !== 'work') {
        // 休憩からworkに切り替わる際の処理
        soundBtn.current.play();
        soundWork?.current?.play();
      } else {
        toastSuccessRB('１ポモドーロ完了')
        soundRest.current.play();
        postRecord(workSec, 1);
      }
    },
  });

  // isRunningをステートに反映
  useEffect(() => {
    dispatch(switchTimer(isRunning));
  }, [dispatch, isRunning])


  // 秒数更新後、タイマーをリスタート
  useEffect(() => {
    restart(createExpiryTimestamp(getModeSec(mode, { workSec, restSec, longRestSec })))
    if (isFirstStart) pause(); // 初回レンダリング時は何もしない
  }, [isFirstStart, longRestSec, restSec, restart, mode, workSec, pause])

  const postRecord = async(sec: number, count: number) => {
    if (!isAuth) return;
    try {
      const params: PostRecordParams = {
        workTime: sec,
        workCount: count,
      }
      devLog('記録作成params：', params);
      await dispatch(createRecord(params));
      toastSuccessRB('記録しました');
    } catch(err) {
      devLog('postRecordのエラー：', err);
      toastErrorRB('記録の保存に失敗しました', { autoClose: 2000 })
    }
  }


  // 秒数だけリセット
  function handleReset() {
    restart(createExpiryTimestamp(getModeSec(mode, { workSec, restSec, longRestSec })));
    pause();
    soundBtn.current.play();
    soundWork?.current?.stop();
    toastSuccessRB('タイマー リセット', { autoClose: 1500 })
  }

  function handleStart() {
    toastSuccessRB('タイマー スタート', { autoClose: 1500 })
    soundBtn.current.play();
    soundWork?.current?.play()
    if (!isFirstStart) {
      resume();
      return;
    }
    setIsFirstStart(false);
    start();
  }

  function handlePause() {
    soundBtn.current.play();
    soundWork?.current?.stop()
    toastSuccessRB('タイマー ストップ', { autoClose: 1500 })
    pause();
  }

  function handleModeChangeForth(nextMode: TimerMode) {
    soundBtn?.current?.play();
    // 集中状態から休憩に切り替わる際の処理
    if(mode === 'work') {
      postRecord(workSec - totalSeconds, 0);
      soundWork?.current?.stop();
    } else {
      soundWork?.current?.play();
    }
    dispatch(modeChangeForth(nextMode));
    toastSuccessRB('状態を切り替えました');
  }

  return(
    <>
      <div>
        <div>
          {/* 円状のコンテナ */}
          <div className='flex items-center justify-center my-8'>
            <div
              className={`radial-progress ${sceneTimerBgColor('')} ${modeBarColor(mode)}`}
              style={{
                "--value": totalSeconds/getModeSec(mode, { workSec, restSec, longRestSec }) * 100, 
                "--size": "20rem",
                "--thickness": "6px"
              } as React.CSSProperties }
              aria-valuenow={100}
              role="progressbar"
            >
              <p className={`${modeTextColor(mode)} text-center`}>{modeText(mode)}</p>
              <p className={`text-7xl font-semibold ${modeTextColor(mode)}`}>
                { secToHMS(totalSeconds) }
              </p>
            </div>
          </div>

          <div className={visibleCalss}>
            {/* タイマー操作ボタン */}
            <div className="flex flex-col justify-center items-center gap-8 mb-8">
              {
                isRunning
                ? <button className="btn btn-outline text-indigo-300 btn-lg" onClick={handlePause}><span className="icon-[weui--pause-outlined] size-8"></span></button>
                : <button className="btn btn-outline btn-primary btn-lg" onClick={handleStart}><span className="icon-[weui--play-filled] size-8"></span></button>
              }

              <p>{`長期休憩まで${4 - count % 4}セット`}</p>

              <div className="flex gap-4">
                <button className="btn btn-outline btn-success" onClick={handleReset}>秒数リセット</button>
                {
                  mode === 'work'
                  ? <button className="btn btn-outline btn-success" onClick={() => handleModeChangeForth('rest')}>{'休憩する'}</button>
                  : <button className="btn btn-outline btn-success" onClick={() => handleModeChangeForth('work')}>{'休憩を強制終了'}</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
