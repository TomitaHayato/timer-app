import { useAppSelector } from "../../../reduxStore/hooks";
import { thisMonthDate, thisWeekDate } from "../../../utils/time";
import { selectRecords } from "../recordsSlice";
import { RecordStat } from "./RecordStat";

export function AggregatedRecords() {
  const { weeklyRecord, monthlyRecord, totalRecord } = useAppSelector(selectRecords);

  return(
    <>
      <div className="mb-8">
        <h3 className="text-gray-400 font-semibold">今週（{thisWeekDate()}）</h3>
        <RecordStat record={weeklyRecord}/>
      </div>
      <div className="mb-8">
        <h3 className="text-gray-400 font-semibold">今月（{thisMonthDate()}）</h3>
        <RecordStat record={monthlyRecord}/>
      </div>
      <div className="mb-8">
        <h3 className="text-gray-400 font-semibold">全期間の合計</h3>
        <RecordStat record={totalRecord}/>
      </div>
    </>
  )
}