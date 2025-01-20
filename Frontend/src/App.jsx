
import React from "react"
import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
 
import AllTask from "./pages/All Task/AllTask"
import Signup from "./components/Signup"
import {Toaster} from "react-hot-toast";
import { useAuth } from "./components/AuthProvider"
import { Navigate } from "react-router-dom"
export default function App() {
  const [authUser,setAuthUser]=useAuth();
  return (
     <>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/alltask" element={<AllTask/>} />
  <Route path="/signup" element={<Signup />} />
      </Routes>

      <Toaster />
     </>
  )
}