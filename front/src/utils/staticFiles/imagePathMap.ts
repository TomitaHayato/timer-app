// 設定のthemeの値と画像ファイルのpathを対応させるObject
const imageMap = {
  default: '/images/forest.png',
  wind_bell: '/images/wind_bell.png',
  sea: '/images/sea.png',
  water: '/images/Water.png',
}

// 上記のObjectを変更されないよう、KeyからPathを取得する関数だけをexportする
export const getImagePath = (key?: keyof typeof imageMap) => {
  if(!key) return imageMap['default'];
  return imageMap[key] || imageMap['default']
}

export type ImageKey = 'default' | 'wind_bell' | 'water' | 'sea'
