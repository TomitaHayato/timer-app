import Drawer from "../components/Drawer";
import Records from "../features/timer/components/Records";
import Timer from "../features/timer/components/Timer";
import TodosIndexSide from "../features/todos/components/TodosIndexSide";

export default function TimerPage() {
  return(
    <>

      <TodosIndexSide />

      <div>
        <Timer />
      </div>

      <div className="indicator z-10 fixed bottom-1/12 left-4">
        <span className="indicator-item status status-success animate-pulse"></span>
        <Drawer btnText={'記録を見る'}>
          <Records />
        </Drawer>
      </div>
    </>
  )
}