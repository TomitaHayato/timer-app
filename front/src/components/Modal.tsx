import type React from "react"

type Props = {
  children: React.ReactNode,
  modalId: string,
}

export function Modal({ children, modalId, }: Props) {
  return(
    <>
      <dialog id={modalId} className="modal z-20">
        <div className={`modal-box bg-gray-600 overflow-y-auto h-7/12`}>
          {children}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}