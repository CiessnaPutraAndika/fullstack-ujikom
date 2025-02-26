import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./layout/Homepage"
import Register from "./forms/Register"
import Dashboard from "./main/Dashboard"
import Home from "./main/Home"
import Regist from "./forms/Regist"
import Login from "./forms/Login"
import DataUsers from "./main/DataUsers"
import History from "./main/History"
import Product from "./main/Product"
import Cart from "./main/Cart"
import Community from "./main/Community"
import About from "./main/About"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/users" element={<DataUsers />} />
          <Route path="/history" element={<History />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
