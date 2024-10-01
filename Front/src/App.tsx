import { Route, Routes } from "react-router-dom"
import "./index.css"
import UserPerfil from "./components/User/UserPerfil"
import Dashboard from "./components/dashboard"
import { useSelector } from "react-redux"
import { RootState } from "./Redux/store"
import UserSesion from "./components/User/UserSesion"
import UserLogin from "./components/User/UserLogin"

function App() {
  const user = useSelector((state: RootState) => state.users.login);
  return (
    <>
    {
      !user?(
       <div className = { "user"} >
          <Routes>
            <Route path="/" element={<UserPerfil />} />
            <Route path="/auth/login" element={<UserLogin />} />
            <Route path="/auth/register" element={<UserSesion />} />
            <Route path="*" element={<UserLogin />} />
          </Routes>
    </div>
  ) : (
    <div className="app">
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="*" element={<Dashboard />} />
    </Routes>
  </div>
  )
}
  </>
)}

export default App
