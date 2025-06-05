import { RecordData, Records } from "../../types/record";

const defaultRecord: RecordData = {
  selfReview: 0,
  workCount: 0,
  workTime: 0,
}

export const defaultRecords: Records = {
  dailyRecord: defaultRecord,
  weeklyRecord: defaultRecord,
  monthlyRecord: defaultRecord,
  totalRecord: defaultRecord,
}
