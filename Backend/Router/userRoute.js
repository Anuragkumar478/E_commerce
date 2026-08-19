const express = require("express");

const {
  registUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser
} = require("../controller/userController");

const {
  forgetPassword,
  resetPassword
} = require("../controller/passwordForRes");

const {
  protect
} = require("../MiddleWare/authMiddlware");

const router = express.Router();


// Register
router.post("/register", registUser);


// Login
router.post("/login", loginUser);


// Profile
router.get(
  "/profile",
  protect,
  getProfile
);


// Update profile
router.put(
  "/profile",
  protect,
  updateProfile
);


// Logout
router.post(
  "/logout",
  logoutUser
);


// Forgot password
router.post(
  "/forgot-password",
  forgetPassword
);


// Reset password
router.post(
  "/reset-password/:token",
  resetPassword
);


module.exports = router;