const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const router = express.Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

router.post("/", async (req, res) => {
  const { credential } = req.body;

  try {
    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required"
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const {
      email,
      given_name,
      family_name,
      picture,
      sub: googleId
    } = payload;

    if (!email) {
      return res.status(400).json({
        message: "Google account email not available"
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: `${given_name || ""} ${family_name || ""}`.trim(),
        email,
        authSource: "google",
        googleId,
        profilePicture: picture
      });
    }

    const token = jwt.sign(
      {
        id: user._id,     
        email: user.email,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        maxAge: 60 * 60 * 1000
      })
      .json({
        message: "Authentication successful",
        user
      });

  } catch (error) {
    console.error("Google Authentication Error:", error);

    res.status(401).json({
      message: "Google authentication failed"
    });
  }
});

module.exports = router;