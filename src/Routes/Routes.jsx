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
import Categories from "../components/Categories";
import CreateCategory from "../components/CreateCategory";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  const user = JSON.stringify(localStorage.getItem('user'));

  return (
    <Routes>
      <Route path="/" element={user && user.role === 1 ? <Admin /> : <Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/createProduct" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path="/updateProduct/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/createCategory" element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
