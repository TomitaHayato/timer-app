import { useNavigate, useParams } from "react-router"
import { toastErrorRB } from "../utils/toast";
import { useEffect } from "react";
import { devLog } from "../utils/logDev";
import { PasswordResetForm } from "../features/password_reset/components/PasswordResetForm";
import { Loading } from "../components/Loading";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { fetchCheckPasswordResetToken, selectPasswordResetState } from "../features/password_reset/redux/passwordResetSlice";

export function PasswordResetPage() {
  const dispatch = useAppDispatch();
  const { token } = useParams(); // URLの動的セグメントからトークン取得
  const navi = useNavigate();
  const { tokenStatus, loading, error } = useAppSelector(selectPasswordResetState);

  useEffect(() => {
    // トークンがURLに存在しない => RootPathに遷移 + トーストメッセージを表示
    devLog('URLのトークン部分:', token);
    if (!token) {
      navi('/');
      toastErrorRB('権限がありません');
      return;
    }

    dispatch(fetchCheckPasswordResetToken(token)); // トークンをサーバで検証
  }, [dispatch, navi, token]);

  // トークンが無効な場合、'/'に遷移
  useEffect(() => {
    if (tokenStatus === 'invalid') {
      toastErrorRB(error || '権限がありません');
      navi('/');
    }
  }, [error, navi, tokenStatus])

  return(
    <>
      {
        (loading || tokenStatus !== 'valid')
        ? <Loading />
        : <PasswordResetForm />
      }
    </>
  )
}
