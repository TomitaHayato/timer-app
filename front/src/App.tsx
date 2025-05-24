import Header from "./features/header/components/Header"
import TimerPage from "./pages/TimerPage"
import { bgCustom } from "./utils/class"

function App() {

  return (
    <>
      <div className={`min-h-screen ${bgCustom()}`}>
        <div>
          <Header/>
          <TimerPage />
        </div>
      </div>
    </>
  )
}

export default App
