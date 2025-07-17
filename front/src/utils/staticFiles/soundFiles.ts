const soundMap = {
  default: '/sound/summer.mp3',
  wind_bell: '/sound/wind_bell.mp3',
  ice: '/sound/ice.mp3',
  btn: '/sound/btn.mp3',
}

export type SoundKey = keyof typeof soundMap;

// 指定された音楽設定に応じて、/publicのmp3のpathを返す
export const getWorkingSoundFilePath = (key?: SoundKey): string => {
  if(!key) return soundMap.default;
  return soundMap[key] || soundMap.default
}

// 音声ファイル一覧
export const soundTypes = [
  "default",
  "wind_bell",
]

// 音声ファイルとそのUI表示名
export const soundTypeName = (soundType?: string): string => {
  switch (soundType) {
    case 'wind_bell':
      return '風鈴'
    case 'default':
      return '蝉の声'
    default: 
      return ''
  }
}
