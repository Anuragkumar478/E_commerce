// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
      {product.image && (
        <img
          src={`http://localhost:3000${product.image}`}
          alt={product.name}
          className="w-32 h-32 object-cover mb-3"
        />
      )}
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mb-2">₹{product.price}</p>
      <p className="text-sm mb-3 text-gray-500">
        {product.supplyLevel || "In Stock"}
      </p>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
