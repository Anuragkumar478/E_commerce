import { createContext, useContext, useState, useEffect } from "react";
import { getProfile, logout as apiLogout,login as apiLogin } from "../utils/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from backend using cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile(); // 🔥 backend verifies cookie
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


   const login = async (formData) => {
    try {
      const data = await apiLogin(formData); // your utils/api login call
      setUser(data); // 🔑 this line is what actually updates the Navbar
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ Logout
  const logout = async () => {
    await apiLogout(); // clears cookie
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser,login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);