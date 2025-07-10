import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";
import { MainLayout } from "./pages/layouts/MainLayout";
import TimerPage from "./pages/TimerPage";
import { PasswordResetPage } from "./pages/PasswordResetPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route 
            index
            element={<TimerPage />}/>
          <Route
            path="/password_reset"
            element={<PasswordResetPage />} />
        </Route>
      </Routes>
      
      {/* トーストメッセージの表示 */}
      <ToastContainer autoClose={3000} draggable={false} />
    </>
  )
}

export default App
