import { useEffect, useRef } from "react";
import { getWorkingSoundFilePath } from "../../../utils/soundFiles"
import { devLog } from "../../../utils/logDev";
import { Howl } from "howler";
import { useAppSelector } from "../../../reduxStore/hooks";
import { selectSetting } from "../../setting/Slices/settingSlice";

export function useSoundHowls() {
  const { workingSound, volume, isMuted } = useAppSelector(selectSetting);
  const volumeOption = volume / 100

  const soundBtn = useRef<Howl>(new Howl({
    src: ['ice.mp3'],
    volume: volumeOption,
    mute: isMuted,
  }))

  const soundRest = useRef<Howl>(new Howl({
    src: ['btn.mp3'],
    volume: volumeOption,
    mute: isMuted,
  }))

  const soundWork = useRef<Howl | null>(null);

  // soundWork, volumeが変化 => sound.currentもそれに合わせて更新
  useEffect(() => {
    soundWork.current?.unload();
    soundBtn.current.unload();
    soundRest.current.unload();

    soundWork.current = _createNewHowl(volumeOption, isMuted, workingSound);

    soundBtn.current = new Howl({
      src: ['ice.mp3'],
      volume: volumeOption,
      mute: isMuted,
    })

    soundRest.current = new Howl({
      src: ['btn.mp3'],
      volume: volumeOption,
      mute: isMuted,
    })

    return () => {
      soundWork.current?.unload();
      soundBtn.current.unload();
      soundRest.current.unload();
      devLog('Howlを解放しました');
    }
  }, [workingSound, volumeOption, isMuted]);

  return {
    soundWork,
    soundBtn,
    soundRest,
  }
}

function _createNewHowl(volume: number, isMuted: boolean, filename?: string) {
  const soundFilepath = getWorkingSoundFilePath(filename);

  return new Howl({
    src: [soundFilepath],
    loop: true,
    volume,
    mute: isMuted,
  })
}
