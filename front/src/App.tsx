import { useEffect } from "react";
import Header from "./features/header/components/Header"
import TimerPage from "./pages/TimerPage"
import { bgCustom } from "./utils/class"
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./reduxStore/hooks";
import { checkAuthToken } from "./features/session/slices/sessionSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => { dispatch(checkAuthToken()) }, [dispatch])

  return (
    <>
      <div className={`min-h-screen ${bgCustom()}`}>
        <div>
          <Header/>
          <TimerPage />
          <ToastContainer autoClose={4000} draggable={false} />
        </div>
      </div>
    </>
  )
}

export default App
