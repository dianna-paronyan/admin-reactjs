import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home";
import Admin from "../pages/adminPage/Admin";
import Products from "../components/Products";
import Users from "../components/Users";
import CreateProduct from "../components/CreateProduct";
import EditProduct from "../components/EditProduct";

function AppRoutes() {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/users" element={<Users/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/createProduct" element={<CreateProduct/>}/>
          <Route path="/updateProduct/:id" element={<EditProduct />}/>
        </Route>
      </Routes>
  );
}

export default AppRoutes;
