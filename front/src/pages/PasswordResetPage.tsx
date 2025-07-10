import { useNavigate, useSearchParams } from "react-router"
import { toastErrorRB } from "../utils/toast";
import { useEffect } from "react";
import { devLog } from "../utils/logDev";
import { PasswordResetForm } from "../features/password_reset/components/PasswordResetForm";
import { Loading } from "../components/Loading";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { fetchCheckPasswordResetToken, selectPasswordResetState } from "../features/password_reset/redux/passwordResetSlice";

export function PasswordResetPage() {
  const dispatch = useAppDispatch();
  const [ paramsInUrl ] = useSearchParams(); // URLの動的セグメントからトークン取得
  const token = paramsInUrl.get('token');
  const id = paramsInUrl.get('id');
  const navi = useNavigate();
  const { tokenStatus, loading, error } = useAppSelector(selectPasswordResetState);

  useEffect(() => {
    // トークンがURLに存在しない => RootPathに遷移 + トーストメッセージを表示
    devLog('URLのパラメータ:', 'token:', token, 'id:', id);
    if (!token || !id) {
      navi('/');
      toastErrorRB('権限がありません');
      return;
    }

    dispatch(fetchCheckPasswordResetToken({ id, token })); // トークンをサーバで検証
  }, [dispatch, id, navi, token]);

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
