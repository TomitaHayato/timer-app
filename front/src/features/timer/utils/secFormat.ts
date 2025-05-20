// 秒数をHH ;MM：SSのフォーマットに変更
export function secToHMS(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return _arrangeFormat(h, m, s)
}

function _arrangeFormat(h: number, m: number, s:number) {
  if (h !== 0) return `${_pad2(h)}：${_pad2(m)}：${_pad2(s)}`;
  if (m !== 0) return `${_pad2(m)}：${_pad2(s)}`;
  return `${_pad2(s)}`
}

function _pad2(n: number) {
  return String(n).padStart(2, '0');
}