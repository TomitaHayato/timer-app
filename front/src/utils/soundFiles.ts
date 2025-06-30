// 指定された音楽設定に応じて、/publicのmp3のpathを返す
export const getWorkingSoundFilePath = (soundType?: string): string => {
  switch (soundType) {
    case 'wind_bell':
      return '/sound/wind_bell.mp3'
    default: 
      return '/sound/summer.mp3'
  }
}
