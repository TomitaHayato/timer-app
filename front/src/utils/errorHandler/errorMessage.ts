// ステータスコードに対するエラーメッセージを返す
export const errorMessageFromStatusCode = (code: number, defaultMessage: string) => {
  switch (code) {
    case 401:
      return 'ログインが必要な操作です'
    case 403:
      return '許可されていない操作です'
    case 404:
      return 'リソースが見つかりません'
    case 422:
      return '入力内容に誤りがあります'
    default:
      return defaultMessage;
  }
}
