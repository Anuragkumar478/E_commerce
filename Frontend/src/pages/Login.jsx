import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";


import { AuthContext } from "../Contexfolder/authcontex";
  // ✔ Correct way to access login function from AuthContext

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
const {login}=useContext(AuthContext);
   // ✔ Correct way

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

     

     try {
       const res = await login(form);
       if (res.success) {
        navigate("/profile");
      } else {
        setError(res.message || "Login failed");
    } 

     } catch (err) {
        setError( "Login failed. Please try again.");
     }finally { 
      setLoading(false);
     }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="p-8 shadow-lg rounded-2xl bg-white w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm">
            {error}
          </p>
        )}

        <input
          className="border p-3 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white p-3 w-full rounded font-semibold transition duration-200 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-600 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  
  );
}

