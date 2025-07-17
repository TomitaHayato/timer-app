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
import { TodoSelector } from "../features/timer/components/TodoSelector";
import { selectVisibleClass } from "../features/display/visibleSlice";

export default function TimerPage() {
  const { dailyRecord } = useAppSelector(selectRecords);
  const isAuth = useAppSelector(selectAuthStatus);
  const visibleClass = useAppSelector(selectVisibleClass); // 要素の表示非表示を管理するclass

  return(
    <>
      <div className={visibleClass}>
        <TodosIndexSide />
      </div>

      {/* メインコンテンツ */}
      <div>
        {/* Todoを表示 */}
        <div className={visibleClass}>
          <TodoSelector />
        </div>        

        <Timer />

        <div className={`absolute top-28 left-12 ${visibleClass}`}>
          <h3 className="text-center text-gray-400 font-semibold mb-2">今日の記録 {todayDate()}</h3>
          {
            isAuth
            ? <RecordStat record={dailyRecord} />
            : <p className="text-gray-500">ログイン後に表示されます</p>
          }
        </div>
        
        <div className={visibleClass}>
          <Records />
        </div>
      </div>

      <div className={`fixed left-4 bottom-8 flex flex-col gap-4 z-10 ${visibleClass}`}>
        <Drawer btnText={'完了済 Todo'}>
          <CompletedTodos />
        </Drawer>

        <Drawer btnText={'設定'}>
          <Setting />
        </Drawer>
      </div>
    </>
  )
}