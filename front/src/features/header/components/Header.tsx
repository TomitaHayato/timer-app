import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { changeVisible } from "../../display/visibleSlice";
import { selectAuthStatus } from "../../session/slices/sessionSlice";
import { LoginFormBtn } from "./LoginFormBtn";
import { LogoutBtn } from "./LogoutBtn";
import MobileDropDown from "./MobileDropDown";
import { ProfileIconBtn } from "./PrifileIconBtn";

export default function Header() {
  const isAuthenticated = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();

  function handleVisibleClick() {
    dispatch(changeVisible(false));
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
            <li>
              <button className="border" onClick={handleVisibleClick}>時間以外を非表示</button>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="flex gap-4">
            { isAuthenticated && <ProfileIconBtn /> }
            {
              isAuthenticated
              ? <LogoutBtn />
              : <LoginFormBtn /> 
            }
          </div>
        </div>
      </div>
    </>
  )
}
