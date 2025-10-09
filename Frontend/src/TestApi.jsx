import React, { useEffect } from "react";
import { getProducts } from "./utils/api"; // adjust path

const TestAPI = () => {
  useEffect(() => {
    const checkAPI = async () => {
      try {
        const data = await getProducts();
        console.log("✅ API working, data received:", data);
      } catch (err) {
        console.error("❌ API error:", err);
      }
    };
    checkAPI();
  }, []);

  return <h2>Check the console for API response</h2>;
};

export default TestAPI;
