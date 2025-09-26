import { TextOnBgImageWrapper } from "../../../components/TextOnBgImageWrapper";
import { useAppSelector } from "../../../reduxStore/hooks"
import { selectSimpleBg } from "../../display/visibleSlice";
import { selectAuthStatus } from "../../auth/slices/authSlice"
import { AggregatedRecords } from "./AggregatedRecords";

export function Records() {
  const isAuth = useAppSelector(selectAuthStatus);
  const simpleBg = useAppSelector(selectSimpleBg);

  return(
    <>
      <div className="py-8 text-center">
        <div className="mb-4">
          <TextOnBgImageWrapper>
            <h3 className={
              simpleBg
              ? "text-3xl text-center text-gray-500"
              : "text-3xl text-center text-amber-500 font-semibold"
            }>記録</h3>
          </TextOnBgImageWrapper>
        </div>

        {
          isAuth
          ? <AggregatedRecords />
          : <TextOnBgImageWrapper>
              <p className="text-gray-400">ログイン後に表示されます</p>
            </TextOnBgImageWrapper>
        }
      </div>
    </>
  )
}