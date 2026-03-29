import { useState,useEffect,createContext } from "react";
import Api from "../utils/api";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await Api.get("/users/profile");
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async(formData)=>{
     try{
        const res=await Api.post("/users/login",formData);
        setUser(res.data.user);
        return { success: true };
     }catch(err){
        return { success: false, message: err.response?.data?.message || "Login failed" };
     }
  };
  const logout = async()=>{
     try{
        await Api.post("/users/logout");
        setUser(null);
     } catch (err) {
        console.error("Error occurred while logging out:", err);
     }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};
