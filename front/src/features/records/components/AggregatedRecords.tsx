import { useAppSelector } from "../../../reduxStore/hooks";
import { thisMonthDate, thisWeekDate } from "../../../utils/time";
import { selectRecords } from "../recordsSlice";
import { RecordStat } from "./RecordStat";
import { RecordStatContainerGray } from "./recordStatContainerGray";

export function AggregatedRecords() {
  const { weeklyRecord, monthlyRecord, totalRecord } = useAppSelector(selectRecords);

  return(
    <>
      <div className="mb-8">
        <RecordStatContainerGray title={`$今週（${thisWeekDate()}）`}>
          <RecordStat record={weeklyRecord}/>
        </RecordStatContainerGray>
      </div>

      <div className="mb-8">
        <RecordStatContainerGray title={`$今月（${thisMonthDate()}）`}>
          <RecordStat record={monthlyRecord}/>
        </RecordStatContainerGray>
      </div>

      <div className="mb-8">
        <RecordStatContainerGray title="全期間の合計">
          <RecordStat record={totalRecord}/>
        </RecordStatContainerGray>
      </div>
    </>
  )
}