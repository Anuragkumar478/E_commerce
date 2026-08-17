import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../utils/cartApi";
import avatar from "../assets/image.png";
import SearchProductBar from "./productSearch";
import { useUser } from "./UserContext";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
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
      await logout();
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="backdrop-blur-lg bg-[#FAF7F1] shadow-lg fixed top-0 left-0 w-full z-50 text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center gap-4">

        {/* Logo + Home */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/"
            className="text-xl md:text-2xl font-extrabold text-black hover:text-blue-900 transition"
          >
            Book shop
          </Link>
          <Link
            to="/"
            className="hidden sm:block text-lg md:text-2xl font-extrabold text-black hover:text-blue-900 transition"
          >
            Home
          </Link>
        </div>

        {/* Search - hidden on small screens, shown on md+ */}
        <div className="hidden md:flex flex-1 max-w-md">
          <SearchProductBar />
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 shrink-0">
          {!user ? (
            <>
              <Link
                to="/register"
                className="px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="px-4 py-1 rounded-full bg-gray-800 text-white hover:bg-black whitespace-nowrap"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/cart"
                className="px-4 py-1 rounded-full bg-black text-white hover:bg-gray-700 whitespace-nowrap"
              >
                🛒 Cart{cartCount > 0 ? ` (${cartCount})` : ""}
              </Link>

              <Link to="/profile">
                <img
                  src={avatar}
                  className="h-9 w-9 rounded-full border-2 border-pink-300"
                  alt="Profile"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-full text-amber-100 bg-green-950 hover:bg-red-700 whitespace-nowrap"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger toggle */}
        <button
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-md hover:bg-black/5"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div className="md:hidden bg-[#FAF7F1] border-t border-black/10 px-4 py-4 space-y-4">
          <SearchProductBar />

          <Link
            to="/"
            className="block font-semibold text-black hover:text-blue-900 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-center"
              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-black text-center"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-700 text-center"
              >
                🛒 Cart{cartCount > 0 ? ` (${cartCount})` : ""}
              </Link>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <img
                  src={avatar}
                  className="h-9 w-9 rounded-full border-2 border-pink-300"
                  alt="Profile"
                />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full text-amber-100 bg-green-950 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;