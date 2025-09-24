import { selectSimpleBg } from "../features/display/visibleSlice"
import { useAppSelector } from "../reduxStore/hooks"
import { bgColorClass } from "../utils/class";

type Props = {
  children: React.ReactNode
}

export function StatsContainerGray({ children }: Props) {
  const simpleBg = useAppSelector(selectSimpleBg);

  return(
    <>
      <div className={`stats shadow border border-gray-500 ${bgColorClass(simpleBg)} min-w-1/2`}>
        { children }
      </div>
    </>
  )
}