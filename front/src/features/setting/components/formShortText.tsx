import { useAppSelector } from "../../../reduxStore/hooks"
import { selectAuthStatus } from "../../session/slices/sessionSlice"

export function FormShortText() {
  const isAuth = useAppSelector(selectAuthStatus);

  return(
    <>
      {
        isAuth
        ? <p className="text-[0.65rem] text-gray-400">※ 保存ボタンを押すと反映されます</p>
        : <p className="text-[0.65rem] text-error">※ ログイン後に設定できます</p>
      }
    </>
  )
}
