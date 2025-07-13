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
              <div></div>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="flex gap-4">
            <button className="btn btn-sm btn-outline" onClick={handleVisibleClick}>
              <span className="icon-[weui--eyes-off-outlined] size-6"></span>
              <p className="text-xs">集中</p>
            </button>
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
