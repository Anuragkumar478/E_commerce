import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/users/profile");
        setUser(data);
      } catch (err) {
        setError("Failed to load profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-600 p-6 rounded-lg shadow-md">
          <p>{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-2xl w-96">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome, {user.name}
        </h1>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Admin:</span>{" "}
            {user.isAdmin ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {user.address || "Not set"}
          </p>
        </div>

        <button
          onClick={() => navigate("/update-profile")}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold transition duration-200"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
