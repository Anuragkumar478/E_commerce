import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCart } from "../utils/api";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartCount(data.items?.length || 0);
      } catch {
        setCartCount(0);
      }
    };
    fetchCart();
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Ankur Book Store</Link>
        </div>

        {/* Links */}
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          </li>
          <li>
            <Link to="/update-profile" className="hover:text-gray-300">Update Profile</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-gray-300">Products</Link>
          </li>
          <li>
            <Link to="/products/create" className="hover:text-gray-300">Add Product</Link>
          </li>

          {/* Cart */}
          <li>
            <Link
              to="/cart"
              className="font-semibold bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              🛒 Cart ({cartCount})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
