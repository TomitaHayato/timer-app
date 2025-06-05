export type Record = {
  workCount: number,
  totalSec: number,
}

export type Records = {
  dailyRecord: RecordData,
  weeklyRecord: RecordData,
  monthlyRecord: RecordData,
  totalRecord: RecordData,
}

export type postRecordParams = {
  selfReview: number,
  workCount: number,
  workTime: number,
}

export type RecordData = {
  selfReview: number,
  workCount: number,
  workTime: number,
}