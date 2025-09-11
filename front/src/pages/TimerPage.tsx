import Drawer from "../components/Drawer";
import { Setting } from "../features/setting/components/Setting";
import Timer from "../features/timer/components/Timer";
import TodosIndexSide from "../features/todos/components/TodosIndexSide";
import CompletedTodos from "../features/todos/components/CompletedTodos";
import { Records } from "../features/records/components/Records";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { checkAuthToken } from "../features/session/slices/sessionSlice";
import { TodoSelector } from "../features/todos/components/timerPageContent/todoSelector/TodoSelector";
import { selectVisibleClass } from "../features/display/visibleSlice";
import { useEffect } from "react";
import { Opening } from "../features/opening/Opening";
import { selectIsOpening } from "../features/opening/openingSlice";
import { TodayRecordsData } from "../features/records/components/timerPageContent/TodayRecordsData";

export default function TimerPage() {
  const visibleClass = useAppSelector(selectVisibleClass); // 要素の表示非表示を管理するclass
  const dispatch = useAppDispatch();
  const isOpening = useAppSelector(selectIsOpening);

  // マウント時に認証Check
  useEffect(() => {
    dispatch(checkAuthToken());
  }, [dispatch])

  if (isOpening) return <Opening />

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

        <div className={`absolute top-28 right-4 ${visibleClass}`}>
          <TodayRecordsData />
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