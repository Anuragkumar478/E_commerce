// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { getCart, updateCart, placeOrder } from "../utils/api";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch cart items
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

  // Update item quantity
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

  // Calculate total price
  const total = cart.reduce(
    (acc, item) => acc + item.product?.price * item.quantity,
    0
  );

  // Place order
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
      const res = await placeOrder({ shippingAddress });
      alert(res.message || "Order placed successfully!");
      setCart([]);
      setShippingAddress("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) return <p className="p-8">Loading cart...</p>;

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-6">Your Cart</h3>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between border-b pb-4"
              >
                {/* Product Image */}
                {item.product?.image && (
                  <img
                    src={`http://localhost:3000${item.product.image}`}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                )}

                {/* Product Name */}
                <span className="flex-1">{item.product?.name}</span>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleUpdate(item.product._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdate(item.product._id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                  <span className="ml-4 font-semibold">
                    ₹{item.product?.price * item.quantity}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Total Price */}
          <div className="mt-6 text-xl font-bold">Total: ₹{total}</div>

          {/* Shipping Address */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Shipping Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="border p-2 rounded w-full max-w-md"
            />
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
