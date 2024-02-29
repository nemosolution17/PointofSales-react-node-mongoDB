import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import LoginForm from "./pages/Accounts/Login";
import Register from "./pages/Accounts/Signup";
import Category from "./pages/products/Category";
import NewProduct from "./pages/products/NewProduct";
import BoughtProduct from "./pages/products/BoughtProduct";
import SoldProduct from "./pages/products/Sales";
import UpdateProduct from "./pages/products/UpdateProduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Blank />} />
          <Route path="products" element={<Blank />} />
          <Route path="customers" element={<Blank />} />
          <Route path="settings" element={<Blank />} />
          <Route path="stats" element={<Blank />} />
        </Route>
        <Route path="login" element={<LoginForm/>} />
        <Route path="signup" element={<Register/>} />
        <Route path="add-category" element={<Category/>} />
        <Route path="add-product" element={<NewProduct/>} />
        <Route path="add-bought-product" element={<BoughtProduct/>} />
        <Route path="add-sales" element={<SoldProduct/>} />
        <Route path="update-product" element={<UpdateProduct/>} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
