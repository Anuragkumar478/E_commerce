import React, { useEffect, useState } from "react";
import {
  getCart,
  updateCart,
  placeOrder,
  removeFromCart,
} from "../utils/api";

import PaymentButton from "../payment/paymentButton";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH CART =================

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data.items || []);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ================= DELETE =================

  const handleDelete = async (id) => {
    try {
      await removeFromCart(id);

      setCart((prevCart) =>
        prevCart.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error("Failed to delete item from cart", err);
      alert("Failed to delete item from cart");
    }
  };

  // ================= UPDATE QUANTITY =================

  const handleUpdate = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const updated = await updateCart(productId, quantity);
      setCart(updated.items);
    } catch (err) {
      console.error(err);
      alert("Failed to update cart");
    }
  };

  // ================= TOTAL =================

  const total = cart.reduce(
    (acc, item) =>
      acc +
      (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  // ================= CHECKOUT =================

  const handleCheckout = async () => {
    if (!shippingAddress.trim()) {
      alert("Please enter shipping address");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const res = await placeOrder({
        shippingAddress,
      });

      alert(res.message || "Order placed successfully!");

      setCart([]);
      setShippingAddress("");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to place order"
      );
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-4">
        <p className="text-gray-600 text-sm sm:text-base">
          Loading cart...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] pt-20 sm:pt-24 pb-10 sm:pb-16">

      <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8">

        {/* ================= TITLE ================= */}

        <div className="mb-6 sm:mb-8">

          <h3 className="text-2xl sm:text-3xl font-bold text-[#1E2A38]">
            Your Cart
          </h3>

          {cart.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {cart.length}{" "}
              {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          )}

        </div>

        {/* ================= EMPTY CART ================= */}

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7DFD1] p-8 sm:p-12 text-center">

            <div className="text-5xl sm:text-6xl mb-4">
              🛒
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#1E2A38]">
              Your cart is empty
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Add some books to your cart and come back here.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

            {/* ================= CART ITEMS ================= */}

            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-[#E7DFD1] rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm"
                >

                  {/* PRODUCT */}

                  <div className="flex gap-3 sm:gap-5">

                    {/* Image */}

                    {item.product?.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg sm:rounded-xl flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#F8F5EE] rounded-lg sm:rounded-xl flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
                        No Image
                      </div>
                    )}

                    {/* Product Information */}

                    <div className="flex-1 min-w-0">

                      <h4 className="font-semibold text-sm sm:text-lg text-[#1E2A38] line-clamp-2">
                        {item.product?.name}
                      </h4>

                      <p className="text-sm sm:text-base text-gray-500 mt-1">
                        ₹{item.product?.price || 0}
                      </p>

                      {/* Mobile / Desktop Controls */}

                      <div className="flex flex-wrap items-center gap-3 mt-3">

                        {/* Quantity */}

                        <div className="flex items-center border border-[#E7DFD1] rounded-lg overflow-hidden">

                          <button
                            onClick={() =>
                              handleUpdate(
                                item.product?._id,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 sm:w-9 sm:h-9 bg-[#F8F5EE] hover:bg-[#F4EBDA] disabled:opacity-40 font-bold"
                          >
                            −
                          </button>

                          <span className="w-9 sm:w-10 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleUpdate(
                                item.product?._id,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 sm:w-9 sm:h-9 bg-[#F8F5EE] hover:bg-[#F4EBDA] font-bold"
                          >
                            +
                          </button>

                        </div>

                        {/* Delete */}

                        <button
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          className="text-xs sm:text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                    {/* Item Total */}

                    <div className="hidden sm:block text-right flex-shrink-0">

                      <p className="text-base sm:text-lg font-bold text-[#1E2A38]">
                        ₹
                        {(item.product?.price || 0) *
                          item.quantity}
                      </p>

                    </div>

                  </div>

                  {/* Mobile Item Total */}

                  <div className="flex sm:hidden justify-between items-center mt-3 pt-3 border-t border-[#E7DFD1]">

                    <span className="text-sm text-gray-500">
                      Item Total
                    </span>

                    <span className="font-bold text-[#1E2A38]">
                      ₹
                      {(item.product?.price || 0) *
                        item.quantity}
                    </span>

                  </div>

                </div>
              ))}

            </div>

            {/* ================= ORDER SUMMARY ================= */}

            <div className="lg:col-span-1">

              <div className="bg-white border border-[#E7DFD1] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:sticky lg:top-24">

                <h2 className="text-lg sm:text-xl font-bold text-[#1E2A38] mb-5">
                  Order Summary
                </h2>

                {/* Shipping Address */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Shipping Address
                  </label>

                  <textarea
                    placeholder="Enter your shipping address"
                    value={shippingAddress}
                    onChange={(e) =>
                      setShippingAddress(e.target.value)
                    }
                    rows={4}
                    className="w-full border border-[#E7DFD1] rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#B8863B]"
                  />

                </div>

                {/* Total */}

                <div className="flex items-center justify-between border-t border-[#E7DFD1] pt-4">

                  <span className="text-base sm:text-lg font-semibold text-gray-600">
                    Total
                  </span>

                  <span className="text-xl sm:text-2xl font-bold text-[#1E2A38]">
                    ₹{total}
                  </span>

                </div>

                {/* Online Payment */}

                <div className="mt-5">

                  <PaymentButton
                    className="w-full"
                    amount={total}
                    shippingAddress={shippingAddress}
                  />

                </div>

                {/* COD */}

                <button
                  onClick={handleCheckout}
                  className="w-full mt-3 bg-[#1E2A38] text-white py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#B8863B] transition"
                >
                  Cash On Delivery
                </button>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;