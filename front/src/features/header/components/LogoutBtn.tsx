import { useAppDispatch } from "../../../reduxStore/hooks"
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { signout } from "../../session/slices/sessionSlice"
import { SessionBtn } from "../classFn/btn"

export const LogoutBtn = () => {
  const dispatch = useAppDispatch();

  const logout = async() => {
    try{
      await dispatch(signout()).unwrap()
      toastSuccessRB('ログアウトしました')
    } catch {
      toastErrorRB('ログアウトに失敗しました')
     }
  }

  return(
    <>
      <button className={SessionBtn()} onClick={logout}>
        ログアウト
      </button>
    </>
  )
}