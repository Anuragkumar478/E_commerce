import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById ,addToCart} from "../utils/api";


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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading book...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#1E2A38]">
          Product not found
        </h2>

        <p className="text-gray-500 mt-2">
          {error}
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-6 bg-[#1E2A38] text-white px-6 py-3 rounded-full"
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
    <div className="min-h-screen bg-[#F8F5EE] py-10 sm:py-14">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm font-semibold text-[#1E2A38] hover:text-[#B8863B] transition"
        >
          ← Back to Books
        </button>

        {/* Main Product */}
        <div className="bg-white rounded-3xl border border-[#E7DFD1] shadow-sm overflow-hidden">

          <div className="grid md:grid-cols-2">

            {/* ================= IMAGE ================= */}
            <div className="bg-[#F4EBDA] p-6 sm:p-10 flex items-center justify-center">

              <div className="relative w-full max-w-lg">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-h-[600px] object-contain rounded-2xl"
                />

                {/* Stock Badge */}
                <div className="absolute top-4 left-4">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
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
            <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center">

              {/* Category */}
              {product.category && (
                <p className="text-xs uppercase tracking-[0.25em] text-[#B8863B] font-semibold mb-4">
                  {product.category}
                </p>
              )}

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2A38] leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mt-4">

                  <div className="text-[#D39B3D]">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(
                      5 - Math.floor(product.rating)
                    )}
                  </div>

                  <span className="text-sm text-gray-500">
                    {product.rating} / 5
                  </span>

                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mt-6">

                <span className="text-3xl font-bold text-[#1E2A38]">
                  ₹{product.price}
                </span>

                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}

              </div>

              {/* Description */}
              <div className="mt-7">

                <h2 className="text-lg font-bold text-[#1E2A38] mb-2">
                  About this book
                </h2>

                <p className="text-gray-600 leading-7">
                  {product.description ||
                    "No description available for this book."}
                </p>

              </div>

              {/* Stock Information */}
              <div className="mt-6 py-4 border-y border-[#E7DFD1]">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Availability
                  </span>

                  <span
                    className={`font-semibold ${
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

              {/* Add Cart */}
              <div className="flex items-center gap-4 mt-6">

  <span className="text-sm font-semibold text-gray-600">
    Quantity
  </span>

  <div className="flex items-center border border-[#E7DFD1] rounded-xl overflow-hidden">

    <button
      type="button"
      disabled={quantity <= 1}
      onClick={() =>
        setQuantity((prev) => Math.max(1, prev - 1))
      }
      className="w-10 h-10 bg-[#F8F5EE] hover:bg-[#F4EBDA] disabled:opacity-40"
    >
      −
    </button>

    <span className="w-12 text-center font-semibold">
      {quantity}
    </span>

    <button
      type="button"
      disabled={quantity >= product.countInStock}
      onClick={() =>
        setQuantity((prev) =>
          Math.min(product.countInStock, prev + 1)
        )
      }
      className="w-10 h-10 bg-[#F8F5EE] hover:bg-[#F4EBDA] disabled:opacity-40"
    >
      +
    </button>

  </div>

</div>
             <button
  type="button"
  disabled={product.countInStock === 0}
  onClick={handleAddToCart}
  className={`w-full mt-7 py-4 rounded-xl font-semibold text-lg transition ${
    product.countInStock === 0
      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
      : "bg-[#1E2A38] text-white hover:bg-[#B8863B]"
  }`}
>
  {product.countInStock === 0
    ? "Out of Stock"
    : "Add to Cart"}
</button>

              {/* Extra Information */}
              <div className="grid grid-cols-3 gap-3 mt-6">

                <div className="text-center p-3 rounded-xl bg-[#F8F5EE]">
                  <div className="text-xl">🚚</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Delivery
                  </p>
                </div>

                <div className="text-center p-3 rounded-xl bg-[#F8F5EE]">
                  <div className="text-xl">🔒</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Secure Payment
                  </p>
                </div>

                <div className="text-center p-3 rounded-xl bg-[#F8F5EE]">
                  <div className="text-xl">📚</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Quality Books
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ================= BOTTOM QUOTE ================= */}
        <div className="text-center py-14">

          <p className="text-3xl text-[#B8863B] font-serif">
            ❝
          </p>

          <p className="text-xl sm:text-2xl font-serif italic text-[#1E2A38]">
            Every book opens a door to another world.
          </p>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;