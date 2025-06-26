import { Modal } from "../../../components/Modal"
import { openModal } from "../../../utils/modelCtl";
import { LoginForm } from "../../session/components/LoginForm"
import { SignupForm } from "../../session/components/SignupForm"
import { SessionBtn } from "../classFn/btn";

export const LoginFormBtn = () => {
  return(
    <>
      <button className={SessionBtn()} onClick={() => openModal('login-form')}>
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