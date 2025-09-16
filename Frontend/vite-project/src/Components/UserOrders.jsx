import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/order/myorder");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border-b py-4 mb-3">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Shipping: {order.shippingAddress}</p>
            <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            <h3 className="font-bold mt-2">Items:</h3>
            <ul className="ml-4 list-disc">
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.product.name} (x{item.quantity}) - ₹
                  {item.product.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
