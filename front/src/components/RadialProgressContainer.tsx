import type { ReactNode } from "react"
import { sceneTimerBgColor } from "../features/timer/utils/class"

type Props = {
  colorClass: string,
  value: number,
  children: ReactNode,
}

export function RadialProgressContainer({ colorClass, value, children }: Props) {
  return(
    <div className='flex items-center justify-center my-8'>
      <div
        className={`radial-progress ${sceneTimerBgColor('')} ${colorClass}`}
        style={{
          "--value": value, 
          "--size": "20rem",
          "--thickness": "6px"
        } as React.CSSProperties }
        aria-valuenow={100}
        role="progressbar"
      >
        { children }
      </div>
    </div>
  )
}
