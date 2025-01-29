import { useState, useEffect } from "react";
import Login from "./Login";
import AddForm from "../pages/AddTask/AddForm";
import { useAuth } from "./AuthProvider";
import Logout from "./Logout";

export default function Navbar() {
  // For authorization
  const [authUser, setAuthUser] = useAuth();
  console.log("from navbar->", authUser);

  // Navbar Sticky on Scroll
  let [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`max-w-screen-2xl container mx-auto px-4 fixed left-0 top-0 right-0 z-50 dark:bg-slate-700 dark:text-white
        ${sticky ? "sticky-navbar bg-base-200 shadow-md dark:bg-slate-900 transition-all ease-in-out" : ""}`}
      >
        <div className="navbar flex items-center justify-between">
          {/* Navbar Start */}
          <div className="flex items-center">
            {/* Dropdown for Small Screens */}
            <div className="dropdown lg:hidden">
              <button tabIndex={0} className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box">
                <li><a href="/">Home</a></li>
                <li><a href="/alltask">All Task</a></li>
              </ul>
            </div>

            {/* Brand Name */}
            <a className="text-2xl md:text-4xl font-bold">Task Mate</a>
          </div>

          {/* Navbar Center - Only visible on large screens */}
          <div className="hidden lg:flex space-x-6">
            <a href="/" className="text-lg font-bold">Home</a>
            <a href="/alltask" className="text-lg font-bold">All Task</a>
          </div>

          {/* Navbar End - Login & Add Task Buttons */}
          <div className="flex items-center space-x-3">
            {authUser ? (
              <>
                <Logout />
                <button
                  className="btn bg-black text-white rounded-md px-4 py-1 hover:bg-slate-800"
                  onClick={() => document.getElementById("my_modal_1").showModal()}
                >
                  Add Task
                </button>
                <AddForm />
              </>
            ) : (
              <button
                className="btn bg-black text-white rounded-md px-4 py-1 hover:bg-slate-800"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
            )}
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}
