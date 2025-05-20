import Timer from "./features/timer/components/Timer"

function App() {

  return (
    <>
      <div>
        <h1 className="text-amber-400 text-5xl">Appコンポーネント</h1>
        <button className="btn btn-primary">OK</button>
        <div>
          <Timer />
        </div>
      </div>
    </>
  )
}

export default App
