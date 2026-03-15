
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-1 mt-0">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Ankur book shop</h2>
          <p className="text-sm opacity-80">
            Your trusted e-commerce platform for quality and affordable products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/" className="hover:underline">Products</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="space-y-2">
            <li>Email: support@shopease.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: India</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-sm opacity-80 border-t border-white/30 pt-4">
        © {new Date().getFullYear()} ShopEase — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
