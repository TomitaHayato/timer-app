import { useAppSelector } from "../../../../reduxStore/hooks";
import { containerGrayClass, textColorClass } from "../../../../utils/class";
import { todayDate } from "../../../../utils/time";
import { selectSimpleBg } from "../../../display/visibleSlice";
import { selectAuthStatus } from "../../../session/slices/sessionSlice";
import { selectRecords } from "../../recordsSlice";
import { RecordStat } from "../RecordStat";

export function TodayRecordStats() {
  const { dailyRecord } = useAppSelector(selectRecords);
  const isAuth = useAppSelector(selectAuthStatus);
  const simpleBg = useAppSelector(selectSimpleBg);

  return (
    <>
      <div className={`${containerGrayClass(simpleBg)}`}>
        <div className="mb-2">
          <h3 className={`text-center ${textColorClass(simpleBg)}`}>今日の記録 {todayDate()}</h3>
        </div>
        {
          isAuth
          ? <RecordStat record={dailyRecord} />
          :  <p className={simpleBg ? "text-gray-400" : "text-gray-500"}>ログイン後に表示されます</p>
        }
      </div>
    </>
  )
}