import Drawer from "../components/Drawer";
import { Setting } from "../features/setting/components/Setting";
import Timer from "../features/timer/components/Timer";
import TodosIndexSide from "../features/todos/components/TodosIndexSide";
import CompletedTodos from "../features/todos/components/CompletedTodos";
import { Records } from "../features/records/components/Records";
import { RecordStat } from "../features/records/components/RecordStat";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { selectRecords } from "../features/records/recordsSlice";
import { todayDate } from "../utils/time";
import { checkAuthToken, selectAuthStatus } from "../features/session/slices/sessionSlice";
import { TodoSelector } from "../features/todos/components/timerPageContent/TodoSelector";
import { selectSimpleBg, selectVisibleClass } from "../features/display/visibleSlice";
import { textColorClass } from "../utils/class";
import { useEffect } from "react";
import { Opening } from "../features/opening/Opening";
import { selectIsOpening } from "../features/opening/openingSlice";
import { TextOnBgImageWrapper } from "../components/TextOnBgImageWrapper";

export default function TimerPage() {
  const { dailyRecord } = useAppSelector(selectRecords);
  const isAuth = useAppSelector(selectAuthStatus);
  const visibleClass = useAppSelector(selectVisibleClass); // 要素の表示非表示を管理するclass
  const simpleBg = useAppSelector(selectSimpleBg);
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

        <div className={`absolute top-28 left-12 ${visibleClass}`}>
          <div className="mb-2">
            <TextOnBgImageWrapper>
              <h3 className={`text-center ${textColorClass(simpleBg)}`}>今日の記録 {todayDate()}</h3>
            </TextOnBgImageWrapper>
          </div>
          {
            isAuth
            ? <RecordStat record={dailyRecord} />
            : <TextOnBgImageWrapper>
                <p className="text-gray-400">ログイン後に表示されます</p>
              </TextOnBgImageWrapper>
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