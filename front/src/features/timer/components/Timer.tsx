import { secToHMS, secToJpFormat } from "../../../utils/secFormat";
import { useState } from "react";
import { selectTimer } from "../timerSlice";
import { useAppSelector } from "../../../reduxStore/hooks";
import { selectSetting } from "../../setting/Slices/settingSlice";
import { getModeSec } from "../utils/getModeSec";
import { modeText } from "../utils/modeText";
import { modeBarColor, modeTextColor } from "../utils/class";
import { selectSimpleBg, selectVisibleClass } from "../../display/visibleSlice";
import { PopUp } from "../../../components/PopUp";
import { RadialProgressContainer } from "../../../components/RadialProgressContainer";
import { Title } from "../../../components/Title";
import { btnLgClass, restBtnClass } from "../../../utils/class";
import { useTimerHook } from "../hooks/useTimerHook";
import { useSoundHowls } from "../hooks/soundSet";

export default function Timer() {
  // ポップアップの表示
  const [ isPopup, setIsPopup ] = useState<boolean>(false);
  const { workSec, restSec, longRestSec } = useAppSelector(selectSetting);
  const { mode, count } = useAppSelector(selectTimer);
  const visibleCalss = useAppSelector(selectVisibleClass);
  const simpleBg = useAppSelector(selectSimpleBg);

  const {
    isRunning,
    totalSeconds,
    pause,
    handleStart,
    handleReset,
    handlePause,
    postRecord,
    toRestModeForth,
    toWorkModeForth,
  } = useTimerHook();

  const {
    playWorkSound,
    stopWorkSound,
    playBtnSound,
  } = useSoundHowls();

  return(
    <>
      <Title text={`[ ${modeText(mode)} ]  ${secToHMS(totalSeconds)}`}/>

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
                ? <button className={btnLgClass(simpleBg)} onClick={() => {
                  playBtnSound();
                  handlePause();
                  stopWorkSound();
                }}><span className="icon-[weui--pause-outlined] size-8"></span></button>
                : <button className={btnLgClass(simpleBg)} onClick={() => {
                  playBtnSound();
                  handleStart();
                  playWorkSound();
                }}><span className="icon-[weui--play-filled] size-8"></span></button>
              }

              <div className="flex gap-4">
                <button
                  className={restBtnClass(simpleBg)}
                  onClick={() => {
                    playBtnSound();
                    stopWorkSound()
                    handleReset();
                  }}
                >秒数リセット</button>
                {
                  mode === 'work'
                  ? (<button className={restBtnClass(simpleBg)} onClick={() => {
                    playBtnSound();
                    stopWorkSound();
                    pause();
                    setIsPopup(true);
                  }}>{'休憩する'}</button>)
                  : (<button className={restBtnClass(simpleBg)} onClick={() => {
                    playBtnSound();
                    toWorkModeForth();
                    playWorkSound();
                  }}>{'休憩を強制終了'}</button>)
                }
              </div>

              <p>{`長期休憩まで${4 - count % 4}セット`}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 集中 -> 休憩の際, 集中時間を記録するか確認するポップアップ */}
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
                    toRestModeForth();
                    setIsPopup(false);
                  }} >はい</button>

                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    toRestModeForth();
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
