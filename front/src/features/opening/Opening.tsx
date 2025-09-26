import { useEffect, useState } from "react";
import { selectSessionLoading } from "../auth/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { getRandomBgClass } from "../../utils/staticFiles/imagePathMap";
import { openingEnd } from "./openingSlice";
import { Title } from "../../components/Title";

export function Opening() {
  const isSessionLoading = useAppSelector(selectSessionLoading);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const [bgClass, setBgClass] = useState("")

  // マウント時に背景をランダムに設定
  useEffect(() => {
    setBgClass(getRandomBgClass())
  }, [])

  // 認証確認処理の完了後、フェードアウトしながらメインページへ
  useEffect(() => {
    if (isSessionLoading) return;

    // 1秒後に要素をフェードアウト
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);
    
    // 2秒後にページに遷移
    const movePageTimer = setTimeout(() => {
      dispatch(openingEnd());
    }, 2000)

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(movePageTimer);
    }
  }, [dispatch, isSessionLoading])

  return(
    <>
      <Title text={'Timer'}/>

      <div className="fixed w-full h-full top-0">
        <div className={bgClass}>
          <div className={
            isVisible
            ? "transition-opacity duration-1000 ease-in-out opacity-100"
            : "transition-opacity duration-1000 ease-in-out opacity-0"
          }>
            <div className="pt-40">
              <p className="text-center font-bold text-6xl glass w-fit mx-auto px-5 py-2 rounded-full text-pink-300">
                Pompdoro
                Timer
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
