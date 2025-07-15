type Props = {
  text: string,
}

export function Title({ text }: Props) {
  return(
    <title>{ text }</title>
  )
}
