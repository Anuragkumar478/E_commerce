import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [form, setForm] = useState({ name: "", description: "", price: "", countInStock: "", category: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      if (file) formData.append("image", file);

      await api.post("/products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/products");
    } catch (err) {
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} className="border p-2 mb-2 w-full" required />
        <input type="number" name="countInStock" placeholder="Stock" onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input name="category" placeholder="Category" onChange={handleChange} className="border p-2 mb-2 w-full" />
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button disabled={loading} className="bg-green-500 text-white p-2 w-full rounded">
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
