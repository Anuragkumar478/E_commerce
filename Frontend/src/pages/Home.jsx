// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { getProducts, addToCart, getCategories } from "../utils/api";
import ProductCard from "../Components/ProductCard";

//import pageImage from "../assets/book.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      setFilterProduct(products);
    } else {
      const filtered = products.filter(product => product.category === cat);
      setFilterProduct(filtered);
    }
  };

  // Search function
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      // If search is empty, show products based on category
      if (selectedCategory === "All") {
        setFilterProduct(products);
      } else {
        const filtered = products.filter(product => product.category === selectedCategory);
        setFilterProduct(filtered);
      }
    } else {
      // Apply search filter
      const searchLower = query.toLowerCase();
      let filtered = products;
      
      // First apply category filter if needed
      if (selectedCategory !== "All") {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      // Then apply search filter
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.author?.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
      );
      
      setFilterProduct(filtered);
    }
  };

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
      {/* Hero Section
      <div
        className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${pageImage})` }}
      >
        <h2 className="text-4xl font-bold mb-4 text-brown-900">
          Welcome to My Bookstore
        </h2>
        <p className="text-lg mb-6 text-gray-800">
          Find your favorite books and explore new stories every day.
        </p>
      </div> */}

      {/* Category Filter */}
      <div className="p-8 bg-gray-50">
        
        {/* Search Bar - ONLY ADDITION */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search books by title, author, or category..."
              className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {/* Search Icon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Clear Button */}
            {searchQuery && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                         text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full ${
                selectedCategory === "All" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition-colors`}
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
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            {selectedCategory === "All" ? "All Books" : `${selectedCategory} Books`}
            {searchQuery && (
              <span className="text-sm text-gray-500 ml-2">
                - searching: "{searchQuery}"
              </span>
            )}
            <span className="text-sm text-gray-500 ml-2">
              ({filterProduct.length} {filterProduct.length === 1 ? 'book' : 'books'})
            </span>
          </h3>
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : filterProduct.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No books found {searchQuery ? `for "${searchQuery}"` : "in this category"}.
            </p>
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
      </div>
    </>
  );
};

export default Home;