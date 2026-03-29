import { createContext, useContext, useState, useEffect } from "react";
import { getProfile, logout as apiLogout } from "../utils/api";

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

  // ✅ Logout
  const logout = async () => {
    await apiLogout(); // clears cookie
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);