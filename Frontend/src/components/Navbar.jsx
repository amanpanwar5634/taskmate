import { useState } from "react"
import { useEffect } from "react";
import Login from "./Login";
import AddForm from "../pages/AddTask/AddForm";
import { useAuth } from "./AuthProvider";
 import Logout from "./Logout";
export default function Navbar(){
 //for authorization
    const [authUser,setAuthUser]=useAuth();
    console.log("from navbar->",authUser);
  /*on scroll navbar stick*/
    let [sticky,setSticky]=useState(false);
    useEffect(()=>{
    const handleScroll=()=>{
    if(window.scrollY>0){setSticky(true)}
    else{setSticky(false)}
    }
    window.addEventListener("scroll",handleScroll)
    return ()=>{window.removeEventListener("scroll",handleScroll)}
    },[])
    /*end*/
return (<>
<div className={`max-w-screeen-2xl container mx-auto md-px-20 px-4 fixed left-0 top-0 right-0 z-50 dark:bg-slate-700 dark:text-white
    ${sticky && "sticky-navbar bg-base-200 shadow-md duration-300  dark:bg-slate-900 dark:text-white transition-all ease-in-out" }`}>
<div className="navbar">
  <div className="navbar-start">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a href="/">Home</a></li>
        <li><a href="/allTask">All Task</a></li>
      <li><a>About</a></li>
       
      </ul>
    </div>
    <a className="btn btn-ghost text-4xl  font-bold">Task Mate</a>
  </div>
  <div className="navbar-end space-x-3">
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-xl font-bold">
      <li><a href="/">Home</a></li>
      <li><a href="/allTask">All Task</a></li>
      
      <li><a>About</a></li>
    </ul>
    <div className="hidden md:block">
    </div >
    <div className="block">
     
</div>
  </div>
   
  <div>
  {authUser?<Logout/>:
  <div>
    <a className="btn  bg-black text-white rounded-md px-5 py-1 hover:bg-slate-800 cursor-pointer"
    onClick={()=>document.getElementById('my_modal_3').showModal()}>Login </a>
    <Login/> </div>
    } </div>
 </div>
 {authUser &&
<div>
<a  className="btn  bg-black text-white rounded-md px-5 py-1 hover:bg-slate-800 cursor-pointer" 
onClick={()=>document.getElementById('my_modal_1').showModal()}>addTask</a><AddForm/>
 </div>}
</div>
</div>
</>)

}