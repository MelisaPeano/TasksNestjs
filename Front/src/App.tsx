import { Route, Routes } from "react-router-dom"
import "./index.css"
import UserRegister from "./components/User/UserSesion"
import UserPerfil from "./components/User/UserPerfil"
import Dashboard from "./components/dashboard"
import UserLogin from "./components/User/UserSesion"
import { useSelector } from "react-redux"
import { RootState } from "./Redux/store"





function App() {
  const user = useSelector((state: RootState) => state.users.login);
  console.log(user);
  return (
    <>
    {
      !user?(
       <div className = { "user"} >
          <Routes>
            <Route path="/" element={<UserPerfil />} />
            <Route path="/auth/login" element={<UserLogin />} />
            <Route path="/auth/register" element={<UserRegister />} />
          </Routes>
    </div>
  ) : (
    <div className="app">
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </div>
  )
}
  </>
)}

export default App
