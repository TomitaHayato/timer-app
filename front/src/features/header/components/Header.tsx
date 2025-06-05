import { Modal } from "../../../components/Modal";
import OnlyDev from "../../../components/OnlyDev";
import { LoginForm } from "../../session/components/LoginForm";
import { SignupForm } from "../../session/components/SignupForm";
import MobileDropDown from "./MobileDropDown";

type dialogOrNull = HTMLDialogElement | null;

export default function Header() {
  function openModal(id: string) {
    const dialogHtml = document.getElementById(id) as dialogOrNull;
    dialogHtml?.showModal();
  }

  return(
    <>
      <div className="navbar bg-ghost shadow-none h-16">
        <div className="navbar-start">
          <MobileDropDown />
          <a className="btn btn-ghost text-xl">Timer</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li>
              {/* 後で消す */}
              { import.meta.env.DEV && <OnlyDev /> }
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <button className="btn btn-sm btn-outline" onClick={() => openModal('login-form')}>
            Login / Signup
          </button>

          <Modal modalId={'login-form'}>
            <div className="flex flex-col gap-8">
              <LoginForm />
              <SignupForm />
            </div>
          </Modal>
        </div>
      </div>
    </>
  )
}
