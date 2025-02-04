import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Product from "./pages/Product";
import { useContext, useState } from "react";
import { ShopContext } from "./context/ShopContext";
import PlaceOrder from "./pages/PlaceOrder";
import NotFound from "./pages/NotFound";
import CheckAuth from "./utils/CheckAuth";
import AddProduct from "./pages/admin/AddProduct";
import ListProducts from "./pages/admin/ListProducts";
import ListOrders from "./pages/admin/ListOrders";
import UserLayout from "./pages/UserLayout";
import AdminLayout from "./pages/admin/AdminLayout";

export default function App() {
  const { getAllProducts } = useContext(ShopContext);
  getAllProducts();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth>
              <UserLayout>
                <Home />
              </UserLayout>
            </CheckAuth>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <CheckAuth>
              <AdminLayout>
              <AddProduct />
              </AdminLayout>
            </CheckAuth>
          }
        />
        <Route
          path="/admin/list-products"
          element={
            <CheckAuth>
              <AdminLayout>
              <ListProducts />
              </AdminLayout>
            </CheckAuth>
          }
        />
        <Route
          path="/admin/list-orders"
          element={
            <CheckAuth>
              <AdminLayout>
              <ListOrders />
              </AdminLayout>
            </CheckAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <CheckAuth>
              <UserLayout>
                <Cart />
              </UserLayout>
            </CheckAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <CheckAuth>
              <UserLayout>
                <Orders />
              </UserLayout>
            </CheckAuth>
          }
        />
        <Route
          path="/place-order"
          element={
            <CheckAuth>
              <UserLayout>
                <PlaceOrder />
              </UserLayout>
            </CheckAuth>
          }
        />
        <Route
          path="/collection"
          element={
            <CheckAuth>
              <UserLayout>
                <Collection />
              </UserLayout>
            </CheckAuth>
          }
        />
        <Route
          path="/about"
          element={
            <CheckAuth>
              <UserLayout>
                <About />
              </UserLayout>
            </CheckAuth>
          }
        />
        <Route
          path="/contact"
          element={
            <CheckAuth>
              <UserLayout>
                <Contact />
              </UserLayout>
            </CheckAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product/:id"
          element={
            <CheckAuth>
              <UserLayout>
                <Product />
              </UserLayout>
            </CheckAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
