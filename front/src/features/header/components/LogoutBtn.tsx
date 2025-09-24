import { useAppDispatch } from "../../../reduxStore/hooks"
import { toastErrorRB, toastSuccessRB } from "../../../utils/toast";
import { signout } from "../../session/slices/sessionSlice"

type Props = {
  btnClass: string,
}

export const LogoutBtn = ({ btnClass }: Props) => {
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
      <button className={btnClass} onClick={logout} data-testid="logout-btn">
        ログアウト
      </button>
    </>
  )
}