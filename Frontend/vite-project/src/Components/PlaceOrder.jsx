import React, { useState } from "react";
import API from "../utils/api";

export default function PlaceOrder() {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handlePlaceOrder = async () => {
    try {
      const res = await API.post("/order/place", { shippingAddress: address });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Place Order</h2>
      <textarea
        className="w-full p-2 border rounded mb-3"
        placeholder="Enter Shipping Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={handlePlaceOrder}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Place Order
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
