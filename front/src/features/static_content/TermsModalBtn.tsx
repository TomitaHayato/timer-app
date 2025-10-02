import { ModalLg } from "../../components/ModalLg"
import { openModal } from "../../utils/modelCtl"
import { Terms } from "./Terms"

export const TermsModalBtn = () => {
  return(
    <>
      <button onClick={() => openModal('terms')} data-testid="terms-open-btn">
        <p>規約</p>
      </button>

      <ModalLg modalId="terms">
        <Terms />
      </ModalLg>
    </>
  )
}
