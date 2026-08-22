import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts, addToCart } from "../utils/api";
import ProductCard from "../Components/ProductCard";

const SearchProduct = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchProducts(query);

        // Make sure products is always an array
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
    } catch (err) {
      console.error("Error adding product to cart:", err);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Searching products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-3 py-4 sm:px-6 sm:py-6 lg:px-8">

      {/* Search heading */}
      <div className="mb-5 sm:mb-7">
        <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Search Results
        </h1>

        {query && (
          <p className="mt-1 text-sm sm:text-base text-gray-500">
            Showing results for{" "}
            <span className="font-semibold text-gray-800">
              "{query}"
            </span>
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* No products */}
      {!error && products.length === 0 && (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-4">
            🔍
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            No products found
          </h2>

          <p className="mt-2 text-sm text-gray-500 max-w-sm">
            We couldn't find any products matching "{query}".
            Try searching for something else.
          </p>
        </div>
      )}

      {/* Products */}
      {products.length > 0 && (
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-3
            sm:gap-5
            lg:gap-6
          "
        >
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
  );
};

export default SearchProduct;