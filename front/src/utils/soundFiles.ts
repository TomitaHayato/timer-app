// 指定された音楽設定に応じて、/publicのmp3のpathを返す
export const getWorkingSoundFilePath = (soundType?: string): string => {
  switch (soundType) {
    case 'wind_bell':
      return '/sound/wind_bell.mp3'
    case 'ice':
      return '/sound/ice.mp3'
    case 'btn':
      return '/sound/btn.mp3'
    default: 
      return '/sound/summer.mp3'
  }
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
