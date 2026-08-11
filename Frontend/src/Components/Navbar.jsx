import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../utils/cartApi";
import avatar from "../assets/image.png";
import SearchProductBar from "./productSearch";
import { useUser } from "./UserContext";


const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {


    async function fetchCart() {
      try {
        const data = await getCart();
        setCartCount(data.items?.length || 0);
      } catch {
        setCartCount(0);
      }
    }
    if (user) {
      fetchCart();
    } else {
      setCartCount(0);
    }
  }, [user]);

 
  const handleLogout = async () => {
    try {
      await logout(); // 🔥 calls backend → clears cookie
      // optional (since you used it)
      // update UI
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
 <SearchProductBar />


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
        {/* {  <div className="flex ">
          <Link to="/register"
          className="flex m-2">
            Register
          </Link>
          <Link to="/login"
          className="flex m-2">
            Login
          </Link>
          </div> } */}
      </div>
    </nav>
  );
};

export default Navbar;
