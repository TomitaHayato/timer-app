
type Props ={
  index: number,
  title: string,
}

export default function TodoItem({ index, title, }: Props) {
  return(
    <>
      <li className="list-row items-center px-2">
        <div className="text-xl font-thin opacity-30 tabular-nums">{index}</div>
        <div>
          <p>{title}</p>
        </div>

        <button className="btn btn-sm btn-outline btn-square">
          🗑️
        </button>

        <button className="btn btn-sm btn-success btn-circle">
          ✔︎
        </button>
      </li>
    </>
  )
}