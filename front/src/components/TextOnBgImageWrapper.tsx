import type React from "react";
import { selectSimpleBg } from "../features/display/visibleSlice";
import { useAppSelector } from "../reduxStore/hooks";

type Props = {
  children: React.ReactNode,
}

export function TextOnBgImageWrapper({ children }: Props) {
  const simpleBg = useAppSelector(selectSimpleBg);

  return(
    <div className={
      simpleBg
      ? "p-2"
      : "p-2 bg-gray-700/50 rounded-xl w-fit mx-auto"
    }>
      { children }
    </div>
  )
}