import { Record, RecordSummaryByPeriod } from "../../types/record";

export const defaultRecord = (): Record => ({
  workCount: 0,
  workTime: 0,
})

export const defaultRecords: RecordSummaryByPeriod = {
  dailyRecord: defaultRecord(),
  weeklyRecord: defaultRecord(),
  monthlyRecord: defaultRecord(),
  totalRecord: defaultRecord(),
}
