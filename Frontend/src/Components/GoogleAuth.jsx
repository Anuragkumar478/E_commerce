import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext"; // Adjust the path as necessary

console.log("🔥 GoogleAuth.jsx loaded");
const GoogleAuth = () => {

  // console.log("Origin:", window.location.origin);
  // console.log(
  //   "Client ID:",
  //   import.meta.env.VITE_GOOGLE_CLIENT_ID
  // );

    const navigate = useNavigate();
    const { setUser } = useUser();
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/google-auth`,
        {
            
          credential: credentialResponse.credential,
        },
        {
          withCredentials: true,
        }
      );

//       console.log(
//   "Google Client ID:",
//   import.meta.env.VITE_GOOGLE_CLIENT_ID
// );
      // console.log("Google Login Success:", response.data);

      // // User is now logged in
      // console.log("User:", response.data.user);

          setUser(response.data.user);

      // Go to profile after login
      navigate("/");

     

    } catch (error) {
      console.error(
        "Google login failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => {
        console.log("Google Login Failed");
      }}
    />
  );
};

export default GoogleAuth;