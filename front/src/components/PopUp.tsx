import type { ReactElement } from "react"

type Props = {
  children: ReactElement,
}

export function PopUp({ children }: Props) {
  return(
    <div className="fixed top-0 w-screen h-screen z-40 bg-gray-600/40">
      <div className="fixed top-60 inset-x-1/3 text-center min-h-3/12 min-w-3/12 bg-indigo-400 rounded-lg p-4 z-40">
        { children }
      </div>
    </div>
  )
}
