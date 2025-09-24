export type postRecordParams = {
  workCount: number,
  workTime: number,
}

export type Record = {
  workCount: number,
  workTime: number,
}

export type Records = Record[]

export type RecordSummaryByPeriod = {
  dailyRecord: Record,
  weeklyRecord: Record,
  monthlyRecord: Record,
  totalRecord: Record,
}
