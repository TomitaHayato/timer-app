import { Modal } from "../../../components/Modal"
import { LoginForm } from "../../session/components/LoginForm"
import { SignupForm } from "../../session/components/SignupForm"
import { SessionBtn } from "./classFn/btn";

type dialogOrNull = HTMLDialogElement | null;

export const LoginFormBtn = () => {
  function openModal(id: string) {
    const dialogHtml = document.getElementById(id) as dialogOrNull;
    dialogHtml?.showModal();
  }

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