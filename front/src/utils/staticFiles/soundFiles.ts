const soundMap = {
  default: '/sound/summer.mp3',
  wind_bell: '/sound/wind_bell.mp3',
  sea: '/sound/sea.mp3',
  water: '/sound/water.mp3',
  ice: '/sound/ice.mp3',
  btn: '/sound/btn.mp3',
}

export type SoundKey = keyof typeof soundMap;

export const workingSoundMap = {
  default: '/sound/summer.mp3',
  wind_bell: '/sound/wind_bell.mp3',
  sea: '/sound/sea.mp3',
  water: '/sound/water.mp3',
}

export type WorkingSoundKey = keyof typeof workingSoundMap;

// 指定された音楽設定に応じて、/publicのmp3のpathを返す
export const getWorkingSoundFilePath = (key?: SoundKey): string => {
  if(!key) return soundMap.default;
  return soundMap[key] || soundMap.default
}

// 音声ファイル一覧
export const soundTypes: WorkingSoundKey[] = [
  "default",
  "wind_bell",
  "sea",
  "water",
]

// 日本語対応（フォームのUI表示に使用）
const _soundNameMap: Record<WorkingSoundKey, string> = {
  wind_bell: '風鈴',
  default: '蝉の声',
  sea: '海',
  water: '水中',
}

// 音声ファイルのUI表示名を返す（soundNameMapの改変を防ぐために関数でexport）
export const soundTypeName = (key?: WorkingSoundKey): string => {
  if (!key) return _soundNameMap.default;
  return _soundNameMap[key]
}
