import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const isOutOfStock = product.countInStock === 0;
  const isLowStock =
    product.countInStock > 0 && product.countInStock <= 5;

  return (
    <div className="group w-full bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E7DFD1] hover:shadow-xl transition-all duration-300 flex flex-col">

      {/* ================= IMAGE ================= */}
      <Link to={`/products/${product._id}`}>
        <div className="relative w-full bg-[#F8F5EE] overflow-hidden aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]">

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full min-h-[180px] flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}

          {/* Stock Badge */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
            <span
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold border ${
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
            <span className="opacity-0 group-hover:opacity-100 bg-white text-[#1E2A38] px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg transition-all duration-300">
              View Product →
            </span>
          </div>
        </div>
      </Link>

      {/* ================= CONTENT ================= */}
      <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-1">

        {/* Category */}
        {product.category && (
          <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#B8863B] font-semibold mb-1.5 sm:mb-2 truncate">
            {product.category}
          </p>
        )}

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#1E2A38] line-clamp-2 min-h-[40px] sm:min-h-[48px] lg:min-h-[56px] group-hover:text-[#B8863B] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1.5 sm:mt-2 min-h-[32px] sm:min-h-[40px]">
            {product.description}
          </p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
            <div className="text-[#D39B3D] text-xs sm:text-sm whitespace-nowrap">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>

            <span className="text-[10px] sm:text-xs text-gray-500">
              {product.rating}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-3 sm:mt-4 mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1E2A38]">
              ₹{product.price}
            </span>

            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
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
          className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 mt-auto ${
            isOutOfStock
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#1E2A38] text-white hover:bg-[#B8863B] sm:hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          }`}
        >
          {isOutOfStock ? (
            "Out of Stock"
          ) : (
            <>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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

              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;