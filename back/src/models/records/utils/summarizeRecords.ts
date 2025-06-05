import { RecordData } from "../../../types/record";
import { defaultRecord } from "./defaultData";

export const summarizeRecords = (records: RecordData[]): RecordData => {
  if (records.length === 0) return defaultRecord;

  const result: RecordData = { ...defaultRecord };

  let totalSelfReview = 0;
  for (let record of records) {
    result.workCount += record.workCount;
    result.workTime += record.workTime;
    totalSelfReview += record.selfReview;
  }
  // 自己評価の平均値を算出
  result.selfReview = Math.round(totalSelfReview * 10 / records.length) / 10

  return result;
}
