import { secToJpFormat } from "../../../utils/secFormat";
import type { Record } from "../types/records";

type Props = {
  record: Record,
}

export function RecordStat({ record }: Props) {
  return(
    <>
      <div className="stats shadow border border-gray-600">
        <div className="stat place-items-center">
          <div className="stat-title">集中時間</div>
          <div className="stat-value text-indigo-500 text-2xl py-1">{ secToJpFormat(record.workTime) }</div>
        </div>

        <div className="stat place-items-center border-l border-gray-600">
          <div className="stat-title">完了ポモドーロ</div>
          <div className="stat-value text-indigo-500 text-2xl py-1">{ record.workCount }</div>
        </div>
      </div>
    </>
  )
}