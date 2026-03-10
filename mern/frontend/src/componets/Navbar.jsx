import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-400 border-b-2 border-indigo-400"
      : "text-gray-300 hover:text-white";

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white text-xl font-bold">
            N
          </span>
          <div>
            <h1 className="text-lg font-semibold text-white">Note Manager</h1>
            <p className="text-xs text-slate-400">
              Simple, secure personal notes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link to="/" className={isActive("/")}>
              Notes
            </Link>
            {/* <Link to="/feedback" className={isActive("/feedback")}>
              Feedback
            </Link> */}
          </div>

          <div className="flex items-center gap-3">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-100 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-md border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-slate-800"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
