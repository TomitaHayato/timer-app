import { secToHMS, secToJpFormat } from "../../../utils/secFormat";
import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from "react";
import { modeChange, modeChangeForth, selectTimer, switchTimer } from "../timerSlice";
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { createExpiryTimestamp } from "../utils/expiryTimestamp";
import { selectSetting } from "../../setting/Slices/settingSlice";
import { getModeSec } from "../utils/getModeSec";
import { modeText } from "../utils/modeText";
import { modeBarColor, modeTextColor } from "../utils/class";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { useSoundHowls } from "../hooks/soundSet";
import { devLog } from "../../../utils/logDev";
import { createRecord } from "../../records/recordsSlice";
import type { PostRecordParams } from "../../records/types/records";
import { selectAuthStatus } from "../../session/slices/sessionSlice";
import { selectVisibleClass } from "../../display/visibleSlice";
import type { TimerMode } from "../types/timerType";
import { PopUp } from "../../../components/PopUp";
import { RadialProgressContainer } from "../../../components/RadialProgressContainer";

export default function Timer() {
  const isAuth = useAppSelector(selectAuthStatus);
  const { workSec, restSec, longRestSec } = useAppSelector(selectSetting);
  const { mode, count } = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();
  const visibleCalss = useAppSelector(selectVisibleClass);

  const { playSound, stopSound } = useSoundHowls();

  // 初めてタイマーをスタートしたかどうか
  const [ isFirstStart, setIsFirstStart ] = useState<boolean>(true);
  // ポップアップの表示
  const [ isPopup, setIsPopup ] = useState<boolean>(false);

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
      stopSound('work');
      if(mode !== 'work') {
        // 休憩からworkに切り替わる際の処理
        playSound('btn');
        playSound('work');
      } else {
        toastSuccessRB('１ポモドーロ完了')
        playSound('finish')
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
    playSound('btn');
    stopSound('work');
    toastSuccessRB('タイマー リセット', { autoClose: 1500 })
  }

  function handleStart() {
    toastSuccessRB('タイマー スタート', { autoClose: 1500 })
    playSound('btn');
    playSound('work');
    if (!isFirstStart) {
      resume();
      return;
    }
    setIsFirstStart(false);
    start();
  }

  function handlePause() {
    playSound('btn');
    stopSound('work');
    toastSuccessRB('タイマー ストップ', { autoClose: 1500 })
    pause();
  }

  // タイマー状態の切り替え
  function handleModeChangeForth(nextMode: TimerMode) {
    playSound('btn');
    // 休憩に切り替わる際の処理
    if(nextMode !== 'work') {
      setIsPopup(true);
      pause();
      // postRecord(workSec - totalSeconds, 0);
      stopSound('work');
    } else {
      playSound('work');
      dispatch(modeChangeForth(nextMode));
      toastSuccessRB('状態を切り替えました');
    }
  }

  return(
    <>
      <div>
        <div>
          {/* 円状のコンテナ */}
          <RadialProgressContainer
            colorClass={modeBarColor(mode)}
            value={totalSeconds/getModeSec(mode, { workSec, restSec, longRestSec }) * 100}
          >
            <p className={`${modeTextColor(mode)} text-center`}>{modeText(mode)}</p>
            <p className={`text-7xl font-semibold ${modeTextColor(mode)}`}>
              { secToHMS(totalSeconds) }
            </p>
          </RadialProgressContainer>

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

      {/* モード変更時に記録するかどうかを確認するためのポップアップ */}
      {
        isPopup && (
          <PopUp>
            <div>
              <p className="mt-8 text-lg">集中時間を記録しますか？</p>
              <p>{`(${secToJpFormat(workSec - totalSeconds)})`}</p>

              <div className="absolute bottom-2 right-2 flex justify-end gap-4">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    postRecord(workSec - totalSeconds, 0);
                    dispatch(modeChangeForth('rest')); // ここを長期休憩にもできる？
                    toastSuccessRB('状態を切り替えました');
                    setIsPopup(false);
                  }} >はい</button>

                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    dispatch(modeChangeForth('rest'));
                    toastSuccessRB('状態を切り替えました');
                    setIsPopup(false);
                  }} >いいえ</button>
              </div>
            </div>
          </PopUp>
        )
      }
    </>
  )
}
