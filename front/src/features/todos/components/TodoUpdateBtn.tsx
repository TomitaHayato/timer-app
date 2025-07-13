type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

export function TodoUpdateBtn({ setIsEdit }: Props) {
  return(
    <>
      <button className="btn btn-xs btn-outline btn-square border-0" onClick={() => setIsEdit(true)}>
        <span className="icon-[line-md--edit] size-5"></span>
      </button>
    </>
  )
}