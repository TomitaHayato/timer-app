export const devLog = (...args: unknown[]): void => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(...args);
}
