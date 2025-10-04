import { LoadingSpans } from "./LoadingSpans";

type Props = {
  className: string,
}

export function LoadingBtn({ className }: Props) {
  return(
    <button className={className}>
      <LoadingSpans />
    </button>
  )
}
