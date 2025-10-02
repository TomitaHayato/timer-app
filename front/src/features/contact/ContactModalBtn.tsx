import { Modal } from "../../components/Modal"
import { openModal } from "../../utils/modelCtl"
import { ContactForm } from "./ContactForm"

export const ContactModalBtn = () => {
  const modalId = "contact-form-modal"
  return (
    <>
      <button onClick={() => openModal(modalId)} data-testid="contact-form-open-btn" className="link link-info">
        <p>お問い合わせ</p>
      </button>

      <Modal modalId={modalId}>
        <ContactForm modalId={modalId}/>
      </Modal>
    </>
  )
}
