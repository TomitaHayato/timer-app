import { Outlet } from "react-router";
import Header from "../../features/header/components/Header";
import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { changeVisible, selectSimpleBg, selectVisible, selectVisibleClass } from "../../features/display/visibleSlice";
import { useEffect } from "react";
import { checkAuthToken } from "../../features/session/slices/sessionSlice";
import { bgCustom } from "../../utils/class";
import { selectSetting } from "../../features/setting/Slices/settingSlice";
import { getImagePath } from "../../utils/staticFiles/imagePathMap";

export function MainLayout() {
  const { bgImage } = useAppSelector(selectSetting);
  const simpleBg = useAppSelector(selectSimpleBg)
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
        <div className={
          simpleBg
          ? ''
          : `bg-cover bg-[url(${getImagePath(bgImage)})]`
        }>
          <div className={visibleCalss}>
            <Header/>
          </div>

          <Outlet />

        </div>

      </div>
    </>
  )
}