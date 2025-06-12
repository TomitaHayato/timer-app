export const getWorkingSoundFilePath = (filename?: string): string => {
  switch (filename) {
    case 'wind_bell':
      return 'wind_bell.mp3'
    default: 
      return 'defaultWorking.mp3'
  }
}
