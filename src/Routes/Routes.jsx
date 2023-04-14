import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import Layout from "../Layouts/Layout"


function AppRoutes() {
  return (
    <Routes>
        <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes