import { useEffect, useRef } from "react";
import { getWorkingSoundFilePath } from "../../../utils/soundFiles"
import { devLog } from "../../../utils/logDev";
import { Howl } from "howler";

export function useSoundHowls(filename?: string) {
  const soundBtn = useRef<Howl>(new Howl({
    src: ['ice.mp3'],
    volume: 0.5
  }))

  const soundRest = useRef<Howl>(new Howl({
    src: ['btn.mp3'],
    volume: 0.25,
  }))

  const soundWork = useRef<Howl | null>(null);

  // filenameが変化 => sound.currentもそれに合わせて更新
  useEffect(() => {
    soundWork.current?.unload();

    soundWork.current = _createNewHowl(filename);

    return () => {
      soundWork.current?.unload();
      devLog('Howlを解放しました');
    }
  }, [filename]);

  return {
    soundWork,
    soundBtn,
    soundRest,
  }
}

function _createNewHowl(filename?: string) {
  const soundFilepath = getWorkingSoundFilePath(filename);

  return new Howl({
    src: [soundFilepath],
    loop: true,
    volume: 0.5
  })
}
