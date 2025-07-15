import { useEffect } from "react"

type Props = {
  text: string,
}

// レンダリングされているか（モジュールスコープで管理することで、複数のTitleコンポーネント間で情報共有）
let hasRendered: boolean = false

export function Title({ text }: Props) {
  // 重複防止のため、既にTitleがレンダリングされていないかを確認
  useEffect(() => {
    if (hasRendered) throw new Error(`Titleコンポーネントが重複しています: ${text}`);

    hasRendered = true;

    return () => {
      hasRendered = false;
    }
  }, [text])

  return(
    <title>{ text }</title>
  )
}
