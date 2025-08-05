// 設定のthemeの値と画像ファイルのpathを対応させるObject
const bgImageClassMap = {
  default:   'min-h-screen bg-cover bg-[url(/images/forest.png)]',
  wind_bell: 'min-h-screen bg-cover bg-[url(/images/wind_bell.png)]',
  sea:       'min-h-screen bg-cover bg-[url(/images/sea.png)]',
  water:     'min-h-screen bg-cover bg-[url(/images/water.png)]',
}

export type ImageKey = keyof typeof bgImageClassMap

// 上記のObjectを変更されないよう、KeyからPathを取得する関数だけをexportする
export const getBgImageClass = (key?: ImageKey): string => {
  if(!key) return bgImageClassMap['default'];
  return bgImageClassMap[key] || bgImageClassMap['default']
}

export const getRandomBgClass = ():string => {
  const allBgClass = Object.values(bgImageClassMap);
  const randomIndex = Math.floor(Math.random() * allBgClass.length);
  return allBgClass[randomIndex];
}
