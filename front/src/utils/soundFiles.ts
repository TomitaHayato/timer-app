export const getWorkingSoundFilePath = (filename?: string): string => {
  switch (filename) {
    case 'wind_bell':
      return '/sound/wind_bell.mp3'
    default: 
      return '/sound/summer.mp3'
  }
}
