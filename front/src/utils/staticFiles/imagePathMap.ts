// 設定のthemeの値と画像ファイルのpathを対応させるObject
const imageMap = {
  default: '',
  wind_bell: '/images/wind_bell.png',
}

// 上記のObjectを変更されないよう、KeyからPathを取得する関数だけをexportする
export const getImagePath = (key: keyof typeof imageMap) => imageMap[key] || imageMap['default']
