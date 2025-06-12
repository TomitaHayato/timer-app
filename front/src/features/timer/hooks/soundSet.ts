import { useEffect, useRef } from "react";
import { getWorkingSoundFilePath } from "../../../utils/soundFiles"
import { devLog } from "../../../utils/logDev";
import { Howl } from "howler";
import { useAppSelector } from "../../../reduxStore/hooks";
import { selectSetting } from "../../setting/Slices/settingSlice";

export function useSoundHowls() {
  const { workingSound, volume } = useAppSelector(selectSetting);
  const volumeOption = volume / 100

  const soundBtn = useRef<Howl>(new Howl({
    src: ['ice.mp3'],
    volume: volumeOption,
  }))

  const soundRest = useRef<Howl>(new Howl({
    src: ['btn.mp3'],
    volume: volumeOption,
  }))

  const soundWork = useRef<Howl | null>(null);

  // soundWork, volumeが変化 => sound.currentもそれに合わせて更新
  useEffect(() => {
    soundWork.current?.unload();
    soundBtn.current.unload();
    soundRest.current.unload();

    soundWork.current = _createNewHowl(volumeOption, workingSound);

    soundBtn.current = new Howl({
      src: ['ice.mp3'],
      volume: volumeOption,
    })

    soundRest.current = new Howl({
      src: ['btn.mp3'],
      volume: volumeOption,
    })

    return () => {
      soundWork.current?.unload();
      soundBtn.current.unload();
      soundRest.current.unload();
      devLog('Howlを解放しました');
    }
  }, [workingSound, volumeOption]);

  return {
    soundWork,
    soundBtn,
    soundRest,
  }
}

function _createNewHowl(volume: number, filename?: string) {
  const soundFilepath = getWorkingSoundFilePath(filename);

  return new Howl({
    src: [soundFilepath],
    loop: true,
    volume,
  })
}
