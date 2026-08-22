import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import {
  Mail,
  MapPin,
  ShieldCheck,
  Pencil,
  LogOut,
  PlusCircle,
  Package,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading, logout } = useUser();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const getInitials = (name = "") =>
    name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white border border-red-100 text-center p-8 rounded-2xl shadow-sm max-w-sm w-full">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-2xl">
            !
          </div>
          <p className="text-gray-700 font-medium mb-1">Not logged in</p>
          <p className="text-gray-400 text-sm mb-5">
            Please log in to view your profile.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-red-500 hover:bg-red-600 active:scale-[0.98] text-white px-4 py-3 rounded-xl font-medium transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:py-16 flex items-start sm:items-center justify-center">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        {/* Header card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Banner */}
          <div className="h-24 sm:h-28 bg-gradient-to-r from-blue-500 to-indigo-600" />

          <div className="px-6 sm:px-8 pb-8">
            {/* Avatar */}
            <div className="-mt-12 sm:-mt-14 flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-md">
                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl sm:text-3xl font-bold">
                  {getInitials(user.name) || "👤"}
                </div>
              </div>

              <h1 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900 text-center">
                {user.name}
              </h1>

              {user.isAdmin && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                  <ShieldCheck size={14} />
                  Admin
                </span>
              )}
            </div>

            {/* Info list */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <Mail size={18} className="text-gray-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm sm:text-base text-gray-800 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <MapPin size={18} className="text-gray-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="text-sm sm:text-base text-gray-800 truncate">
                    {user.address || "Not set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Admin panel */}
            {user.isAdmin && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                  🛠 Admin Panel
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to="/products/create">
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white px-4 py-3 rounded-xl font-medium transition">
                      <PlusCircle size={18} />
                      Add Product
                    </button>
                  </Link>

                  <Link to="/products">
                    <button className="w-full flex items-center justify-center gap-2 bg-amber-900 hover:bg-amber-800 active:scale-[0.98] text-white px-4 py-3 rounded-xl font-medium transition">
                      <Package size={18} />
                      See Products
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => navigate("/update-profile")}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white p-3.5 rounded-xl font-semibold transition"
              >
                <Pencil size={18} />
                Update Profile
              </button>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 active:scale-[0.98] text-red-600 p-3.5 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <LogOut size={18} />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}