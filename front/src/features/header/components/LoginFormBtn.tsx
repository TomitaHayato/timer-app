import { Modal } from "../../../components/Modal"
import { openModal } from "../../../utils/modelCtl";
import { LoginForm } from "../../session/components/LoginForm"
import { SignupForm } from "../../session/components/SignupForm"

type Props = {
  btnClass: string,
}

export const LoginFormBtn = ({ btnClass }: Props) => {
  return(
    <>
      <button className={btnClass} onClick={() => openModal('login-form')} data-testid="login-form-modal-btn">
        Login / Signup
      </button>

      <Modal modalId={'login-form'}>
        <div className="flex flex-col gap-8">
          <LoginForm />
          <SignupForm />
        </div>
      </Modal>
    </>
  )
}