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
import { TextOnBgImageWrapper } from "../../../components/TextOnBgImageWrapper";
import { selectAuthStatus } from "../../session/slices/sessionSlice";

export default function Timer() {
  // ポップアップの表示
  const isAuth = useAppSelector(selectAuthStatus);
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

  function timerPause() {
    playBtnSound();
    handlePause();
    stopWorkSound();
  }

  function timerStart() {
    playBtnSound();
    handleStart();
    playWorkSound();
  }

  function timerSecReset() {
    playBtnSound();
    stopWorkSound()
    handleReset();
  }

  function timerMoveRestForth() {
    playBtnSound();
    stopWorkSound();
    pause();
    if(isAuth) {
      setIsPopup(true);
    } else {
      toRestModeForth();
    }
  }

  function timerMoveWorkForth() {
    playBtnSound();
    toWorkModeForth();
    playWorkSound();
  }

  function handlePopup(confirm: boolean) {
    if(confirm) postRecord(workSec - totalSeconds, 0); // 非同期
    toRestModeForth();
    setIsPopup(false);
  }

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
            <div className="flex flex-col justify-center items-center gap-4 mb-8">
              {
                isRunning
                ? <button className={btnLgClass(simpleBg)} onClick={timerPause}><span className="icon-[weui--pause-outlined] size-8"></span></button>
                : <button className={btnLgClass(simpleBg)} onClick={timerStart}><span className="icon-[weui--play-filled] size-8"></span></button>
              }

              <div className="flex gap-4">
                <button className={restBtnClass(simpleBg)} onClick={timerSecReset}>
                  <span className="icon-[line-md--rotate-270] size-8"></span>
                </button>
                {
                  mode === 'work'
                  ? (<button className={restBtnClass(simpleBg)} onClick={timerMoveRestForth}><span className="icon-[streamline--tea-cup] size-6"></span></button>)
                  : (<button className={restBtnClass(simpleBg)} onClick={timerMoveWorkForth}><i className="icon-[streamline-ultimate--co-working-space-laptop-bold] size-6"/></button>)
                }
              </div>
              
              <TextOnBgImageWrapper>
                <p className="text-lg">{`長期休憩まで${4 - count % 4}セット`}</p>
              </TextOnBgImageWrapper>
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
                  onClick={() => handlePopup(true)} >はい</button>

                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handlePopup(false)} >いいえ</button>
              </div>
            </div>
          </PopUp>
        )
      }
    </>
  )
}
