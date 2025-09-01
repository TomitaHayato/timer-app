import { useAppSelector } from "../../../reduxStore/hooks";
import { shortContainerGrayClass, statTitleColorClass } from "../../../utils/class";
import { selectSimpleBg } from "../../display/visibleSlice";

type Props = {
  title: string,
  children: React.ReactNode
}

export function RecordStatContainerGray({ title, children }: Props) {
  const simpleBg = useAppSelector(selectSimpleBg);

  return(
    <>
      <div className={`${shortContainerGrayClass(simpleBg)}`}>
        <div className="mb-2">
          <h3 className={statTitleColorClass(simpleBg)}>{ title }</h3>
        </div>

        { children }
      </div>
    </>
  )
}