import { useAppSelector } from "../../../reduxStore/hooks"
import { selectAuthStatus } from "../../session/slices/sessionSlice"

export function Records() {
  const isAuth = useAppSelector(selectAuthStatus);

  if(!isAuth) {
    return (
      <div className="py-8 text-center">
        <h3 className="text-3xl text-center text-gray-500 mb-8">記録</h3>
        <p className="text-gray-500">ログイン後に表示されます</p>
      </div>
    )
  }

  return(
    <>
      <div className="py-8 text-center">
        <h3 className="text-3xl text-center mb-8">記録</h3>
      </div>
    </>
  )
}