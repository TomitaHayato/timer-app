import { ModalLg } from "../../components/ModalLg"
import { openModal } from "../../utils/modelCtl"
import { Policy } from "./Policy"

export const PolicyModalBtn = () => {
  return(
    <>
      <button onClick={() => openModal('policy-modal')} data-testid="policy-open-btn" className="link link-info">
        <p>プライバシーポリシー</p>
      </button>

      <ModalLg modalId="policy-modal">
        <Policy />
      </ModalLg>
    </>
  )
}
