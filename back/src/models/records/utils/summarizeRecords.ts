import { defaultRecord } from "../../../config/defaultVals/defaultRecords";
import { Record, Records } from "../../../types/record";

// Recordのプロパティを集計し、1つのRecordとして返す
export const summarizeRecords = (records: Records): Record => {
  // Recordがない場合、デフォルト値を返す
  if (records.length === 0) return defaultRecord();

  // 集計
  const result: Record = { ...defaultRecord() };
  for (let record of records) {
    result.workCount += record.workCount;
    result.workTime += record.workTime;
  }

  return result;
}
