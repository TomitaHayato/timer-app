import { TodayTodos } from "../../../todos/components/timerPageContent/TodayTodos";
import { TodayRecordStats } from "./TodayRecordStats";

export function TodayRecordsData() {

  return(
    <>
      <div className="">
        <TodayRecordStats />
      </div>

      <div>
        <TodayTodos />
      </div>
    </>
  )
}