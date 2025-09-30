// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../utils/api";
import ProductCard from "../Components/ProductCard";
import pageImage from "../assets/book.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
      alert(`${product.name} added to cart ✅`);
    } catch {
      alert("Failed to add to cart ❌");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat"
        
      >
        <h2 className="text-4xl font-bold mb-4 text-brown-900">
          Welcome to My Bookstore
        </h2>
        <p className="text-lg mb-6 text-gray-800">
          Find your favorite books and explore new stories every day.
        </p>
      </div>

      {/* Products */}
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-6">Available Books</h3>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
