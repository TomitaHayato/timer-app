import OnlyDev from "../../../components/OnlyDev";
import { useAppSelector } from "../../../reduxStore/hooks";
import { selectAuthStatus } from "../../session/slices/sessionSlice";
import { LoginFormBtn } from "./LoginFormBtn";
import { LogoutBtn } from "./LogoutBtn";
import MobileDropDown from "./MobileDropDown";

export default function Header() {
  const isAuthenticated = useAppSelector(selectAuthStatus);

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
          {
            isAuthenticated
            ? <LogoutBtn />
            : <LoginFormBtn /> 
          }
        </div>
      </div>
    </>
  )
}
