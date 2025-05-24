type Props = {
  errorText?: string,
}

export default function FormErrorText({ errorText }: Props) {
  return (
    <>
      { errorText && <p className="text-error">{errorText}</p> }
    </>
  )
}
