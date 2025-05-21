export function createExpiryTimestamp(sec: number): Date {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + sec);
  return expiryTimestamp;
}
