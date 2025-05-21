import Header from "./features/header/components/Header"
import Timer from "./features/timer/components/Timer"

function App() {

  return (
    <>
      <div className="min-h-screen bg-linear-to-tr from-indigo-950 from-40% via-indigo-800 via-80% to-indigo-700 to-100%">
        <div>
          <Header/>
          <Timer />
        </div>
      </div>
    </>
  )
}

export default App
