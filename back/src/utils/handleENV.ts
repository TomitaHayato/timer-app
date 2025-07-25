import { devLog } from "./dev/devLog";

// 環境変数を取得 or エラー
export const getEnvValue = (key: string): string => {
  const origin = process.env[key]

  if (!origin) {
    devLog('環境変数', key, 'が定義されていません');
    throw new Error()
  }
  return origin;
}
