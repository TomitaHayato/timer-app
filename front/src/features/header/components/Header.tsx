import { useAppDispatch, useAppSelector } from "../../../reduxStore/hooks";
import { btnSmClass } from "../../../utils/class";
import { changeSimpleBg, changeVisible, selectSimpleBg } from "../../display/visibleSlice";
import { selectAuthStatus } from "../../auth/slices/authSlice";
import { LoginFormBtn } from "./LoginFormBtn";
import { LogoutBtn } from "./LogoutBtn";
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
      <div className="navbar bg-ghost shadow-none h-16" data-testid="header">
        <div className="navbar-start">
          <button className="btn btn-ghost text-xl">Timer</button>
        </div>

        <div className="navbar-end">
          <div className="flex gap-4">
            <button className={btnClass} onClick={handleSimpleBgClick}>
              <span className="icon-[weui--album-filled] size-6"></span>
              <p className="text-xs">シンプル背景</p>
            </button>

            {/* 集中ボタン */}
            <button className={btnClass} onClick={handleVisibleClick} data-testid="focus-ctl-button">
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
