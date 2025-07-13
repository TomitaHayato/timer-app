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
  workCount: number,
  workTime: number,
}

export type RecordData = {
  workCount: number,
  workTime: number,
}