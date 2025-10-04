import { ContactModalBtn } from "../../contact/ContactModalBtn"
import { PolicyModalBtn } from "../../static_content/PolicyModalBtn"
import { TermsModalBtn } from "../../static_content/TermsModalBtn"

export const Footer = () => {
  return (
    <>
      <div className="flex justify-center gap-8 bg-gray-100/50 p-4">
        <TermsModalBtn />
        <PolicyModalBtn />
        <ContactModalBtn />
      </div>
    </>
  )
}
