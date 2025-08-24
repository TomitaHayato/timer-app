import { secToJpFormat } from "../../../utils/secFormat";
import type { Record } from "../../../types/records";
import { Stat } from "../../../components/Stat";
import { StatsContainerGray } from "../../../components/StatsContainerGray";

type Props = {
  record: Record,
}

export function RecordStat({ record }: Props) {
  return(
    <>
      <StatsContainerGray>
        <Stat title="集中時間" content={ secToJpFormat(record.workTime) }/>

        <Stat title="完了ポモドーロ" content={ record.workCount }/>
      </StatsContainerGray>
    </>
  )
}