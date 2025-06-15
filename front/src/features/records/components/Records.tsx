import { useAppSelector } from "../../../reduxStore/hooks"
import { selectAuthStatus } from "../../session/slices/sessionSlice"
import { AggregatedRecords } from "./AggregatedRecords";

export function Records() {
  const isAuth = useAppSelector(selectAuthStatus);

  return(
    <>
      <div className="py-8 text-center">
        <h3 className="text-3xl text-center text-gray-500 mb-8">記録</h3>
        {
          isAuth
          ?  <AggregatedRecords />
          : <p className="text-gray-500">ログイン後に表示されます</p>
        }
      </div>
    </>
  )
}