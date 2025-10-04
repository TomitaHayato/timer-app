import type React from "react"

type Props = {
  children: React.ReactNode,
  modalId: string,
}

export function ModalLg({ children, modalId, }: Props) {
  return(
    <>
      <dialog id={modalId} className="modal z-20">
        <div className={`modal-box bg-gray-600 overflow-y-auto h-9/12 min-w-7/12`}>
          <div className="modal-action absolute top-2 right-2 mt-0">
            <form method="dialog">
              <button className="btn btn-sm btn-ghost" id={`close-${modalId}`}>
                <p className="text-error">x</p>
              </button>
            </form>
          </div>
          {children}
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}