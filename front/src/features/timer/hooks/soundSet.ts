import { useEffect, useRef } from "react";
import { getWorkingSoundFilePath } from "../../../utils/soundFiles"
import { devLog } from "../../../utils/logDev";
import { Howl } from "howler";
import { useAppSelector } from "../../../reduxStore/hooks";
import { selectSetting } from "../../setting/Slices/settingSlice";

export function useSoundHowls() {
  const { workingSound, volume, isMuted } = useAppSelector(selectSetting);
  const volumeOption = volume / 100 // 0~1の範囲内にする

  // ボタン押下の音
  const soundBtn = useRef<Howl>(_createNewLoopHowl(volumeOption, isMuted, 'ice'));
  // 作業終了の音
  const soundFinish = useRef<Howl>(_createNewLoopHowl(volumeOption, isMuted, 'btn'))
  // 作業中に流れる音楽 (useEffectで値をセット)
  const soundWork = useRef<Howl | null>(null);

  // soundWork, volumeが変化 => sound.currentを新しいHowlインスタンスに更新
  useEffect(() => {
    soundWork.current?.unload();
    soundBtn.current.unload();
    soundFinish.current.unload();

    soundWork.current = _createNewLoopHowl(volumeOption, isMuted, workingSound, true);
    soundBtn.current = _createNewLoopHowl(volumeOption, isMuted, 'ice')
    soundFinish.current = _createNewLoopHowl(volumeOption, isMuted, 'btn')

    return () => {
      soundWork.current?.unload();
      soundBtn.current.unload();
      soundFinish.current.unload();
      devLog('Howlを解放しました');
    }
  }, [workingSound, volumeOption, isMuted]);

  // ---- コンポーネントで呼び出す関数 ----
  const playWorkSound   = () => soundWork?.current?.play();
  const stopWorkSound   = () => soundWork?.current?.stop();
  const playBtnSound    = () => soundBtn.current?.play();
  const playFinishSound = () => soundFinish?.current?.play();

  return {
    playWorkSound,
    stopWorkSound,
    playBtnSound,
    playFinishSound,
  }
}

// 新しいHowlインスタンスを作成
function _createNewLoopHowl(volume: number, mute: boolean, filepath?: string, loop?: boolean) {
  const soundFilepath = getWorkingSoundFilePath(filepath);

  return new Howl({
    src: [soundFilepath],
    loop,
    volume,
    mute,
  })
}
