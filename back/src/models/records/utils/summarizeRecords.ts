import { RecordData } from "../../../types/record";
import { defaultRecord } from "./defaultData";

export const summarizeRecords = (records: RecordData[]): RecordData => {
  if (records.length === 0) return defaultRecord;

  const result: RecordData = { ...defaultRecord };

  for (let record of records) {
    result.workCount += record.workCount;
    result.workTime += record.workTime;
  }

  return result;
}
