import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { btnSmClass } from "../../../utils/class";
import { changeSimpleBg, changeVisible, selectSimpleBg } from "../../display/visibleSlice";
import { selectAuthStatus } from "../../session/slices/sessionSlice";
import { LoginFormBtn } from "./LoginFormBtn";
import { LogoutBtn } from "./LogoutBtn";
import MobileDropDown from "./MobileDropDown";
import { ProfileIconBtn } from "./PrifileIconBtn";

export default function Header() {
  const isAuthenticated = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const simpleBg = useAppSelector(selectSimpleBg);

  const btnClass = btnSmClass(simpleBg);

  function handleVisibleClick() {
    dispatch(changeVisible(false));
  }

  function handleSimpleBgClick() {
    dispatch(changeSimpleBg(!simpleBg))
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
            <button className={btnClass} onClick={handleSimpleBgClick}>
              <span className="icon-[weui--album-filled] size-6"></span>
              <p className="text-xs">シンプル背景</p>
            </button>

            {/* 集中ボタン */}
            <button className={btnClass} onClick={handleVisibleClick}>
              <span className="icon-[weui--eyes-off-outlined] size-6"></span>
              <p className="text-xs">集中</p>
            </button>

            {/* プロフィール */}
            { isAuthenticated && <ProfileIconBtn btnClass={btnClass}/> }

            {/* ログインログアウト */}
            {
              isAuthenticated
              ? <LogoutBtn btnClass={btnClass}/>
              : <LoginFormBtn btnClass={btnClass}/>
            }
          </div>
        </div>
      </div>
    </>
  )
}
