import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts, addToCart, getCategories } from "../utils/api";
import ProductCard from "../Components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navbarSearch = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilterProduct(data);

        const cat = await getCategories();
        setCategories(cat);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // APPLY SEARCH FROM NAVBAR
  useEffect(() => {
    if (navbarSearch) {
      handleSearch(navbarSearch);
      setSearchQuery(navbarSearch);
    }
  }, [navbarSearch]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);

    if (cat === "All") {
      setFilterProduct(products);
      return;
    }

    const filtered = products.filter((p) => p.category === cat);
    setFilterProduct(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.author?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    setFilterProduct(filtered);
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 1);
      alert(`${product.name} added to cart`);
    } catch {
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="pt-24 p-8 bg-gray-800 min-h-screen">

      {/* Category Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleCategoryClick("All")}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Section */}
      <h3 className="text-2xl font-bold mb-6">
        Books ({filterProduct.length})
      </h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : filterProduct.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProduct.map((product) => (
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

export default Home;
