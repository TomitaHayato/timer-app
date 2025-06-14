import { useAppSelector } from "../../../reduxStore/hooks"
import { secToJpFormat } from "../../../utils/secFormat";
import { todayDate } from "../../../utils/today";
import { selectDailyRecords } from "../recordsSlice"

export function TodayRecordStat() {
  const { workTime, workCount } = useAppSelector(selectDailyRecords);

  return(
    <>
      <h3 className="text-center text-gray-400 font-semibold mb-2">今日の記録 {todayDate()}</h3>
      <div className="stats shadow bg-gray-700">
        <div className="stat place-items-center">
          <div className="stat-title">集中時間</div>
          <div className="stat-value text-info text-2xl py-1">{ secToJpFormat(workTime) }</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">完了ポモドーロ</div>
          <div className="stat-value text-info text-2xl py-1">{ workCount }</div>
        </div>
      </div>
    </>
  )
}