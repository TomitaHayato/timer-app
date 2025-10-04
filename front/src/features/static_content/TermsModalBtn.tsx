import { ModalLg } from "../../components/ModalLg"
import { openModal } from "../../utils/modelCtl"
import { Terms } from "./Terms"

export const TermsModalBtn = () => {
  return(
    <>
      <button onClick={() => openModal('terms')} data-testid="terms-open-btn" className="link link-info">
        <p>利用規約</p>
      </button>

      <ModalLg modalId="terms">
        <Terms />
      </ModalLg>
    </>
  )
}
