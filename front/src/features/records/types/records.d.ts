export type Record = {
  workTime: number,
  workCount: number,
}

export type PostRecordParams = {
  workTime: number,
  workCount: number,
}

export type RecordsState = {
  records: TermsRecords,
  loading: boolean,
  error: string | null,
}

export type TermsRecords = {
  dailyRecord: Record,
  weeklyRecord: Record,
  monthlyRecord: Record,
  totalRecord: Record,
}
