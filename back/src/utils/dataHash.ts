import bcrypt from 'bcrypt'
import { devLog } from './dev/devLog';

export const dataHash = async(data: string) => {
  try {
    const hashedData = await bcrypt.hash(data, 10);
    return hashedData;
  } catch(err) {
    devLog('Error hashing:', data, err);
    throw err;
  }
}

export const hashCompare = async(data: string, hashedData: string) => {
  try {
    return await bcrypt.compare(data, hashedData);
  } catch(err) {
    devLog('bcrypt.compareのエラー', err);
    throw err
  }
}
