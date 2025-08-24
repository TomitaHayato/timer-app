import { selectSimpleBg } from "../features/display/visibleSlice"
import { useAppSelector } from "../reduxStore/hooks"
import { textColorClassOnGrayBg } from "../utils/class";

type Props = {
  title: string,
  content: string | number,
}

export function Stat({title, content}: Props) {
  const simpleBg = useAppSelector(selectSimpleBg);

  return(
    <>
      <div className="stat place-items-center py-2">
        <div className={`stat-title ${textColorClassOnGrayBg(simpleBg)}`}>{ title }</div>
        <div className="stat-value text-indigo-500 text-2xl py-1">{ content }</div>
      </div>
    </>
  )
}
