import Drawer from "../components/Drawer";
import { Setting } from "../features/setting/components/Setting";
import Timer from "../features/timer/components/Timer";
import TodosIndexSide from "../features/todos/components/TodosIndexSide";
import CompletedTodos from "../features/todos/components/CompletedTodos";
import { Records } from "../features/records/components/Records";
import { TodayRecordStat } from "../features/records/components/TodayRecordStat";

export default function TimerPage() {
  return(
    <>
      <TodosIndexSide />

      <div>
        <Timer />

        <div className="absolute top-28 left-12">
          <TodayRecordStat />
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