import { useAppSelector } from "../../../../reduxStore/hooks"
import { containerGrayClass } from "../../../../utils/class";
import { selectSimpleBg } from "../../../display/visibleSlice"

export function TodayTodos() {
  const simpleBg = useAppSelector(selectSimpleBg);

  return(
    <>
      <div className={containerGrayClass(simpleBg)}>
      </div>
    </>
  )
}