import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <div className="flex justify-between items-center container mx-auto h-16 px-4 py-2 bg-slate-800 text-white">
      <div className="flex gap-2">
        <img src="/vite.svg" alt="logo" />
        <span className="text-2xl font-bold">ToposelAssignment</span>
      </div>

      <div className="flex gap-2 items-center mr-3">
        {authUser ? (
          <button
            onClick={() => logout()}
            className="text-white hover:text-slate-200 bg-blue-600 rounded-md px-4 py-2 "
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to={"/login"}
              className="text-white hover:text-slate-200 bg-blue-600 rounded-md px-4 py-2 "
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="text-white hover:text-slate-200 bg-red-600 rounded-md px-4 py-2 "
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
