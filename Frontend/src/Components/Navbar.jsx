import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart,logout,getProfile } from "../utils/api";
import avatar from "../assets/image.png";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  async function loadUser() {
    try {
      const userData = await getProfile(); // 🔥 get user from backend
      setUser(userData);
      fetchCart();
    } catch (error) {
      setUser(null);
    }
  }

  async function fetchCart() {
    try {
      const data = await getCart();
      setCartCount(data.items?.length || 0);
    } catch {
      setCartCount(0);
    }
  }

  loadUser();
}, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchQuery}`);
  };

  const handleLogout = async () => {
  try {
    await logout(); // 🔥 calls backend → clears cookie
   // optional (since you used it)
    setUser(null); // update UI
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <nav className="backdrop-blur-lg bg-slate-900 shadow-lg fixed top-0 left-0 w-full z-50 text-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-700 hover:text-blue-900 transition"
        >
           Book shop 
        </Link>
         <Link
          to="/"
          className="text-2xl font-extrabold text-black-700 hover:text-blue-900 transition"
        >
          Home 
        </Link>

        
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:block w-1/3 relative"
        >
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* search icon */}
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>

        {/* Menu Right */}
        <div className="flex items-center space-x-6">
          {!user ? (
            <>
              <Link
                to="/register"
                className="px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="px-4 py-1 rounded-full bg-gray-800 text-white hover:bg-black"
              >
                Login
              </Link>
            </>
          ) : (
            <>
  <Link
    to="/cart"
    className="px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700"
  >
    🛒 Cart
  </Link>

  <Link to="/profile">
    <img
      src={avatar}
      className="h-9 w-9 rounded-full border-2 border-blue-600"
      alt="Profile"
    />
  </Link>

  {/* 🔥 Logout Button */}
  <button
    onClick={handleLogout}
    className="px-4 py-1 rounded-full bg-red-600 hover:bg-red-700"
  >
    Logout
  </button>
</>
          )}
         </div>
       {/* { <div className="flex ">
          <Link to="/register"
          className="flex m-2">
            Register
          </Link>
          <Link to="/login"
          className="flex m-2">
            Login
          </Link>
        </div> */} 
      </div>
    </nav>
  );
};

export default Navbar;
