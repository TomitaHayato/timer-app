import { Stat } from "../../../../components/Stat";
import { StatsContainerGray } from "../../../../components/StatsContainerGray";
import { useAppSelector } from "../../../../reduxStore/hooks"
import { selectTodayTodos } from "../../todoSlice"
import { calcCompletedTodosPercentage } from "../../utils/todosStatistics";

export function TodayTodoStatus() {
  const todos = useAppSelector(selectTodayTodos);

  return(
    <>
      <div className="text-center">
        <StatsContainerGray>
          <Stat title="完了" content={ `${calcCompletedTodosPercentage(todos)} %` }/>
        </StatsContainerGray>
      </div>
    </>
  )
}
