import { useAppSelector } from "../../../reduxStore/hooks";
import { bgColorClass, textColorClassOnGrayBg } from "../../../utils/class";
import { secToJpFormat } from "../../../utils/secFormat";
import { selectSimpleBg } from "../../display/visibleSlice";
import type { Record } from "../types/records";

type Props = {
  record: Record,
}

export function RecordStat({ record }: Props) {
  const simpleBg = useAppSelector(selectSimpleBg);

  return(
    <>
      <div className={`stats shadow border border-gray-600 ${bgColorClass(simpleBg)}`}>
        <div className="stat place-items-center">
          <div className={`stat-title ${textColorClassOnGrayBg(simpleBg)}`}>集中時間</div>
          <div className="stat-value text-indigo-500 text-2xl py-1">{ secToJpFormat(record.workTime) }</div>
        </div>

        <div className="stat place-items-center border-l border-gray-600">
          <div className={`stat-title ${textColorClassOnGrayBg(simpleBg)}`}>完了ポモドーロ</div>
          <div className="stat-value text-indigo-500 text-2xl py-1">{ record.workCount }</div>
        </div>
      </div>
    </>
  )
}