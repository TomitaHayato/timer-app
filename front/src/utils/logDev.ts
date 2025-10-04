// 開発環境でのみログを表示
export const devLog = (...args: unknown[]) => {
  if (!import.meta.env.DEV) return;
  console.log(...args);
}

export const sleep = (time: number) => {
  if (!import.meta.env.DEV) return;

  return new Promise((r) => setTimeout(r, time));
};
