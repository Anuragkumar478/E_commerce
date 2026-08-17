import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, addToCart } from "../utils/api";

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductById(id);

        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);

      alert("Book added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add book to cart"
      );
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-4">
        <p className="text-base sm:text-lg text-gray-600">
          Loading book...
        </p>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex flex-col items-center justify-center px-4 text-center">

        <h2 className="text-xl sm:text-2xl font-bold text-[#1E2A38]">
          Product not found
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md">
          {error}
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-5 sm:mt-6 bg-[#1E2A38] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base"
        >
          Back to Books
        </button>
      </div>
    );
  }

  const isOutOfStock = product.countInStock === 0;

  const isLowStock =
    product.countInStock > 0 &&
    product.countInStock <= 5;

  return (
    <div className="min-h-screen bg-[#F8F5EE] py-6 sm:py-10 md:py-14">

      <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8">

        {/* ================= BACK ================= */}

        <button
          onClick={() => navigate(-1)}
          className="mb-5 sm:mb-7 md:mb-8 text-sm sm:text-base font-semibold text-[#1E2A38] hover:text-[#B8863B] transition"
        >
          ← Back to Books
        </button>

        {/* ================= PRODUCT CARD ================= */}

        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7DFD1] shadow-sm overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* ================= IMAGE ================= */}

            <div className="bg-[#F4EBDA] p-4 sm:p-6 md:p-8 lg:p-10 flex items-center justify-center">

              <div className="relative w-full max-w-md sm:max-w-lg">

                <div className="w-full aspect-square sm:aspect-[4/3] md:aspect-square flex items-center justify-center">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
                  />

                </div>

                {/* Stock Badge */}

                <div className="absolute top-2 left-2 sm:top-4 sm:left-4">

                  <span
                    className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-sm font-semibold ${
                      isOutOfStock
                        ? "bg-red-100 text-red-700"
                        : isLowStock
                        ? "bg-amber-100 text-amber-700"
                        : "bg-white text-green-700 shadow"
                    }`}
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : isLowStock
                      ? `Only ${product.countInStock} left`
                      : "In Stock"}
                  </span>

                </div>

              </div>
            </div>

            {/* ================= DETAILS ================= */}

            <div className="p-5 sm:p-7 md:p-8 lg:p-12 flex flex-col justify-center">

              {/* Category */}

              {product.category && (
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#B8863B] font-semibold mb-3 sm:mb-4">
                  {product.category}
                </p>
              )}

              {/* Name */}

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1E2A38] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}

              {product.rating && (
                <div className="flex items-center gap-2 mt-3 sm:mt-4">

                  <div className="text-[#D39B3D] text-sm sm:text-base">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(
                      5 - Math.floor(product.rating)
                    )}
                  </div>

                  <span className="text-xs sm:text-sm text-gray-500">
                    {product.rating} / 5
                  </span>

                </div>
              )}

              {/* Price */}

              <div className="flex items-center flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">

                <span className="text-2xl sm:text-3xl font-bold text-[#1E2A38]">
                  ₹{product.price}
                </span>

                {product.originalPrice && (
                  <span className="text-sm sm:text-lg text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}

              </div>

              {/* Description */}

              <div className="mt-5 sm:mt-7">

                <h2 className="text-base sm:text-lg font-bold text-[#1E2A38] mb-2">
                  About this book
                </h2>

                <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
                  {product.description ||
                    "No description available for this book."}
                </p>

              </div>

              {/* Stock Information */}

              <div className="mt-5 sm:mt-6 py-3 sm:py-4 border-y border-[#E7DFD1]">

                <div className="flex items-center justify-between gap-3">

                  <span className="text-sm sm:text-base text-gray-500">
                    Availability
                  </span>

                  <span
                    className={`text-sm sm:text-base font-semibold text-right ${
                      isOutOfStock
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {isOutOfStock
                      ? "Currently unavailable"
                      : `${product.countInStock} available`}
                  </span>

                </div>

              </div>

              {/* ================= QUANTITY ================= */}

              {!isOutOfStock && (
                <div className="flex items-center justify-between sm:justify-start gap-4 mt-5 sm:mt-6">

                  <span className="text-sm sm:text-base font-semibold text-gray-600">
                    Quantity
                  </span>

                  <div className="flex items-center border border-[#E7DFD1] rounded-xl overflow-hidden">

                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.max(1, prev - 1)
                        )
                      }
                      className="w-10 h-10 sm:w-11 sm:h-11 bg-[#F8F5EE] hover:bg-[#F4EBDA] disabled:opacity-40 text-lg"
                    >
                      −
                    </button>

                    <span className="w-11 sm:w-12 text-center font-semibold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      disabled={
                        quantity >= product.countInStock
                      }
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(
                            product.countInStock,
                            prev + 1
                          )
                        )
                      }
                      className="w-10 h-10 sm:w-11 sm:h-11 bg-[#F8F5EE] hover:bg-[#F4EBDA] disabled:opacity-40 text-lg"
                    >
                      +
                    </button>

                  </div>

                </div>
              )}

              {/* ================= ADD TO CART ================= */}

              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`w-full mt-5 sm:mt-7 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition ${
                  isOutOfStock
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#1E2A38] text-white hover:bg-[#B8863B] active:scale-[0.99]"
                }`}
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>

              {/* ================= EXTRA INFORMATION ================= */}

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5 sm:mt-6">

                <div className="text-center p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#F8F5EE]">

                  <div className="text-lg sm:text-xl">
                    🚚
                  </div>

                  <p className="text-[10px] sm:text-xs text-gray-600 mt-1">
                    Delivery
                  </p>

                </div>

                <div className="text-center p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#F8F5EE]">

                  <div className="text-lg sm:text-xl">
                    🔒
                  </div>

                  <p className="text-[10px] sm:text-xs text-gray-600 mt-1">
                    Secure Payment
                  </p>

                </div>

                <div className="text-center p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#F8F5EE]">

                  <div className="text-lg sm:text-xl">
                    📚
                  </div>

                  <p className="text-[10px] sm:text-xs text-gray-600 mt-1">
                    Quality Books
                  </p>

                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ================= BOTTOM QUOTE ================= */}

        <div className="text-center py-10 sm:py-14 px-4">

          <p className="text-2xl sm:text-3xl text-[#B8863B] font-serif">
            ❝
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-[#1E2A38]">
            Every book opens a door to another world.
          </p>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;