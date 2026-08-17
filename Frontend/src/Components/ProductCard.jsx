import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const isOutOfStock = product.countInStock === 0;
  const isLowStock =
    product.countInStock > 0 && product.countInStock <= 5;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E7DFD1] hover:shadow-xl transition-all duration-300">

      {/* ================= IMAGE ================= */}
      <Link to={`/products/${product._id}`}>
        <div className="relative bg-[#F8F5EE] overflow-hidden">

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          {/* Stock Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                isOutOfStock
                  ? "bg-red-50 text-red-700 border-red-200"
                  : isLowStock
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-white/95 text-green-700 border-green-200"
              }`}
            >
              {isOutOfStock
                ? "Out of Stock"
                : isLowStock
                ? `Only ${product.countInStock} left`
                : "In Stock"}
            </span>
          </div>

          {/* View Product */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-white text-[#1E2A38] px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-300">
              View Product →
            </span>
          </div>
        </div>
      </Link>

      {/* ================= CONTENT ================= */}
      <div className="p-5">

        {/* Category */}
        {product.category && (
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#B8863B] font-semibold mb-2">
            {product.category}
          </p>
        )}

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-bold text-[#1E2A38] line-clamp-2 min-h-[56px] group-hover:text-[#B8863B] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mt-2 min-h-[40px]">
            {product.description}
          </p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mt-3">
            <div className="text-[#D39B3D] text-sm">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>

            <span className="text-xs text-gray-500">
              {product.rating}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-4 mb-4">

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#1E2A38]">
              ₹{product.price}
            </span>

            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

        </div>

        {/* Add To Cart */}
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => onAddToCart(product)}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            isOutOfStock
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#1E2A38] text-white hover:bg-[#B8863B] hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          }`}
        >
          {isOutOfStock ? (
            "Out of Stock"
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2h12m-7 4a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>

              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;