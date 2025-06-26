import { useEffect } from "react";
import Header from "./features/header/components/Header"
import TimerPage from "./pages/TimerPage"
import { bgCustom } from "./utils/class"
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./reduxStore/hooks";
import { checkAuthToken } from "./features/session/slices/sessionSlice";
import { changeVisible, selectVisible, selectVisibleClass } from "./features/display/visibleSlice";

function App() {
  const dispatch = useAppDispatch();
  const visibleCalss = useAppSelector(selectVisibleClass);
  const isVisible = useAppSelector(selectVisible);

  // ページ上のどこかがクリックされた時に発火
  function handleClickAnywhere() {
    if (isVisible) return;
    dispatch(changeVisible(true));
  }

  useEffect(() => {
    dispatch(checkAuthToken());
  }, [dispatch])

  return (
    <>
      <div className={`min-h-screen ${bgCustom()}`} onClick={handleClickAnywhere}>
        <div>
          <div className={visibleCalss}>
            <Header/>
          </div>
          <TimerPage />
          <ToastContainer autoClose={4000} draggable={false} />
        </div>
      </div>
    </>
  )
}

export default App
