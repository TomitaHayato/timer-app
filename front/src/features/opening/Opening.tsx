import { useEffect, useState } from "react";
import { selectSessionLoading } from "../session/slices/sessionSlice";
import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { devLog } from "../../utils/logDev";
import { getRandomBgClass } from "../../utils/staticFiles/imagePathMap";
import { openingEnd } from "./openingSlice";

export function Opening() {
  devLog('Openingコンポーネント');
  const isSessionLoading = useAppSelector(selectSessionLoading);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const [bgClass, setBgClass] = useState("")

  useEffect(() => {
    setBgClass(getRandomBgClass())
  }, [])

  useEffect(() => {
    if (isSessionLoading) return;

    // 1秒フェードアウトしてからページ遷移
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);
    
    // ページに遷移
    const movePageTimer = setTimeout(() => {
      dispatch(openingEnd());
    }, 2000)

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(movePageTimer);
    }
  }, [dispatch, isSessionLoading])

  return(
    <div className="fixed w-full h-full top-0">
      <div className={bgClass}>
        <div className={
          isVisible
          ? "transition-opacity duration-1000 ease-in-out opacity-100"
          : "transition-opacity duration-1000 ease-in-out opacity-0"
        }>
          <div className="pt-40">
            <p className="text-center font-bold text-6xl text-sky-400 glass w-fit mx-auto px-2 py-1">
              Pompdoro
              Timer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
