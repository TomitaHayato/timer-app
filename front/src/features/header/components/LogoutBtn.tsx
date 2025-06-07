import { useAppDispatch } from "../../../reduxStore/hooks"
import { signout } from "../../session/slices/sessionSlice"
import { SessionBtn } from "./classFn/btn"

export const LogoutBtn = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(signout());
  }

  return(
    <>
      <button className={SessionBtn()} onClick={logout}>
        ログアウト
      </button>
    </>
  )
}