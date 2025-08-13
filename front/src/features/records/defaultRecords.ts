export const defaultRecord = {
  workTime: 0,
  workCount: 0,
}

export const defaultRecords = () => {
  return {
    dailyRecord: defaultRecord,
    weeklyRecord: defaultRecord,
    monthlyRecord: defaultRecord,
    totalRecord: defaultRecord,
  }
}
