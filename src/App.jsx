import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Products } from "./pages/Products";
import { Cart } from "./pages/Cart";
import { NoPage } from "./pages/NoPage";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import { Account } from "./pages/Account";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import Form from "./pages/Form";
//named export = > import React from "react" , React este default export

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/account" element={<Account />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/form" element={<Form />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
