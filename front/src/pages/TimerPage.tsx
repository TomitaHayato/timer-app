import Drawer from "../components/Drawer";
import { Setting } from "../features/setting/components/Setting";
import Timer from "../features/timer/components/Timer";
import TodosIndexSide from "../features/todos/components/TodosIndexSide";
import CompletedTodos from "../features/todos/components/CompletedTodos";
import { Records } from "../features/records/components/Records";
import { RecordStat } from "../features/records/components/RecordStat";
import { useAppSelector } from "../reduxStore/hooks";
import { selectRecords } from "../features/records/recordsSlice";
import { todayDate } from "../utils/time";
import { selectAuthStatus } from "../features/session/slices/sessionSlice";

export default function TimerPage() {
  const { dailyRecord } = useAppSelector(selectRecords);
  const isAuth = useAppSelector(selectAuthStatus);

  return(
    <>
      <TodosIndexSide />

      <div>
        <Timer />

        <div className="absolute top-28 left-12">
          <h3 className="text-center text-gray-400 font-semibold mb-2">今日の記録 {todayDate()}</h3>
          {
            isAuth
            ? <RecordStat record={dailyRecord} />
            : <p className="text-gray-500">ログイン後に表示されます</p>
          }
        </div>

        <Records />
      </div>

      <div className="fixed left-4 bottom-8 flex flex-col gap-4 z-10">
        <div className="indicator">
          <span className="indicator-item status status-success animate-pulse"></span>
          <Drawer btnText={'完了済 Todo'}>
            <CompletedTodos />
          </Drawer>
        </div>

        <div className="indicator">
          <span className="indicator-item status status-success animate-pulse"></span>
          <Drawer btnText={'設定'}>
            <Setting />
          </Drawer>
        </div>
      </div>
    </>
  )
}