export type Record = {
  workTime: number,
  workCount: number,
  selfReview: number,
}

export type RecordsState = {
  records: TermsRecords,
  loading: boolean,
  error: string | null,
}

export type TermsRecords = {
  todayRecord: Record,
  weeklyRecord: Record,
  monthlyRecord: Record,
  totalRecord: Record,
}
