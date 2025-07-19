import { useAppSelector } from "../../../reduxStore/hooks";
import { textColorClass } from "../../../utils/class";
import { thisMonthDate, thisWeekDate } from "../../../utils/time";
import { selectSimpleBg } from "../../display/visibleSlice";
import { selectRecords } from "../recordsSlice";
import { RecordStat } from "./RecordStat";

export function AggregatedRecords() {
  const { weeklyRecord, monthlyRecord, totalRecord } = useAppSelector(selectRecords);
  const simpleBg = useAppSelector(selectSimpleBg);

  return(
    <>
      <div className="mb-8">
        <h3 className={textColorClass(simpleBg)}>今週（{thisWeekDate()}）</h3>
        <RecordStat record={weeklyRecord}/>
      </div>
      <div className="mb-8">
        <h3 className={textColorClass(simpleBg)}>今月（{thisMonthDate()}）</h3>
        <RecordStat record={monthlyRecord}/>
      </div>
      <div className="mb-8">
        <h3 className={textColorClass(simpleBg)}>全期間の合計</h3>
        <RecordStat record={totalRecord}/>
      </div>
    </>
  )
}