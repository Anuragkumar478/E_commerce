import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function UpdateProfile() {
  const [form, setForm] = useState({ name: "", address: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.put("/users/profile", form);
      alert("✅ Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="p-8 shadow-lg rounded-2xl bg-white w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</p>
        )}

        <input
          className="border p-3 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="border p-3 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white p-3 w-full rounded font-semibold transition duration-200 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>

        <p className="text-sm text-center mt-4">
          Want to go back?{" "}
          <span
            onClick={() => navigate("/profile")}
            className="text-purple-600 font-medium cursor-pointer hover:underline"
          >
            Profile
          </span>
        </p>
      </form>
    </div>
  );
}
