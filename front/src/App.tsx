import Header from "./features/header/components/Header"
import TimerPage from "./pages/TimerPage"
import { bgCustom } from "./utils/class"
import { ToastContainer } from "react-toastify";

function App() {
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
