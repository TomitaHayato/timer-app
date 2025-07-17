import { Outlet } from "react-router";
import Header from "../../features/header/components/Header";
import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { changeVisible, selectVisible, selectVisibleClass } from "../../features/display/visibleSlice";
import { useEffect } from "react";
import { checkAuthToken } from "../../features/session/slices/sessionSlice";
import { bgCustom } from "../../utils/class";

export function MainLayout() {
  const dispatch = useAppDispatch();
  const visibleCalss = useAppSelector(selectVisibleClass);
  const isVisible = useAppSelector(selectVisible);

  // ページがクリックされた時に発火
  function handleClickAnywhere() {
    if (isVisible) return;
    dispatch(changeVisible(true));
  }

  // マウント時に認証Check
  useEffect(() => {
    dispatch(checkAuthToken());
  }, [dispatch])

  return(
    <>
      <div className={`min-h-screen ${bgCustom()}`} onClick={handleClickAnywhere}>
        <div className="bg-[url(/images/wind_bell.png)] bg-cover">
          <div className={visibleCalss}>
            <Header/>
          </div>

          <Outlet />

        </div>
      </div>
    </>
  )
}