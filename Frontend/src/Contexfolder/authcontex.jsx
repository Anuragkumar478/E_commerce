import { useState,useEffect,createContext } from "react";
import api from "../utils/api";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/users/profile");
        // console.log("Fetched user:", data);
        setUser(data);
      } catch (err) {
        if(err.response?.status !== 401){
        setUser(null); 
      }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async(formData)=>{
     try{
        const res=await api.post("/users/login",formData);
        setUser(res.data);
        return { success: true };
     }catch(err){
        return { success: false, message: err.response?.data?.message || "Login failed" };
     }
  };
  const logout = async()=>{
     try{
        await api.post("/users/logout");
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
