import { useTimer } from "react-timer-hook";
import { createExpiryTimestamp } from "../utils/expiryTimestamp";
import { getModeSec } from "../utils/getModeSec";
import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { modeChange, modeChangeForth, selectTimer, switchTimer } from "../timerSlice";
import { useSoundHowls } from "./soundSet";
import { selectSetting } from "../../setting/Slices/settingSlice";
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import type { PostRecordParams } from "../../../types/records";
import { devLog } from "../../../utils/logDev";
import { createRecord } from "../../records/recordsSlice";
import { selectAuthStatus } from "../../session/slices/sessionSlice";
import { useEffect, useState } from "react";

export function useTimerHook() {
  // 初めてタイマーをスタートしたかどうか
  const [ isFirstStart, setIsFirstStart ] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectAuthStatus);
  const { workSec, restSec, longRestSec } = useAppSelector(selectSetting);
  const { mode } = useAppSelector(selectTimer);

  const {
    playWorkSound,
    stopWorkSound,
    playBtnSound,
    playFinishSound,
  } = useSoundHowls();

  const postRecord = async(sec: number, count: number) => {
    if (!isAuth) return; // 認証前は機能しない
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
      stopWorkSound();
      if(mode !== 'work') {
        // 休憩からworkに切り替わる際の処理
        playBtnSound();
        playWorkSound();
      } else {
        toastSuccessRB('１ポモドーロ完了')
        playFinishSound();
        postRecord(workSec, 1);
      }
    },
  });

  // 秒数更新後、タイマーをリスタート
  useEffect(() => {
    restart(createExpiryTimestamp(getModeSec(mode, { workSec, restSec, longRestSec })))
    if (isFirstStart) pause(); // 初回レンダリング時は何もしない
  }, [isFirstStart, longRestSec, restSec, restart, mode, workSec, pause])

  // isRunningをステートに反映
  useEffect(() => {
    dispatch(switchTimer(isRunning));
  }, [dispatch, isRunning])

  // 秒数だけリセット
  function handleReset() {
    restart(createExpiryTimestamp(getModeSec(mode, { workSec, restSec, longRestSec })));
    pause();
    toastSuccessRB('タイマー リセット', { autoClose: 1000 })
  }

  function handleStart() {
    toastSuccessRB('スタート', { autoClose: 1000 })
    if (!isFirstStart) {
      resume();
      return;
    }
    setIsFirstStart(false);
    start();
  }

  function handlePause() {
    toastSuccessRB('タイマー停止', { autoClose: 1000 })
    pause();
  }

  function toRestModeForth() {
    dispatch(modeChangeForth('rest'));
    toastSuccessRB('休憩');
  }

  function toWorkModeForth() {
    dispatch(modeChangeForth('work'));
    toastSuccessRB('集中モード');
  }

  return {
    pause,
    isRunning,
    totalSeconds,
    handleStart,
    handleReset,
    handlePause,
    toRestModeForth,
    toWorkModeForth,
    postRecord,
  }
}
