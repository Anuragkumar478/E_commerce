const crypto = require("crypto");
const { Resend } = require("resend");
const bcrypt = require("bcryptjs");

const User = require("../Model/User");

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// ======================================================
// FORGOT PASSWORD
// ======================================================

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Don't reveal whether account exists
    if (!user) {
      return res.status(200).json({
        message:
          "If an account exists with this email, a reset link has been sent.",
      });
    }

    // ==================================================
    // GENERATE RANDOM RESET TOKEN
    // ==================================================

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // ==================================================
    // HASH TOKEN BEFORE SAVING TO DATABASE
    // ==================================================

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // ==================================================
    // TOKEN EXPIRES IN 10 MINUTES
    // ==================================================

    const resetTokenExpire =
      Date.now() + 10 * 60 * 1000;

    // ==================================================
    // SAVE HASHED TOKEN
    // ==================================================

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = resetTokenExpire;

    await user.save();

    // ==================================================
    // CREATE FRONTEND RESET URL
    // ==================================================

    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // ==================================================
    // EMAIL HTML
    // ==================================================

    const emailHtml = `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
      ">

        <h2>Reset Your Password</h2>

        <p>
          Hello ${user.name || "User"},
        </p>

        <p>
          We received a request to reset your password.
        </p>

        <p>
          Click the button below to create a new password:
        </p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top: 20px;">
          This link will expire in
          <strong>10 minutes</strong>.
        </p>

        <p>
          If you didn't request a password reset,
          you can safely ignore this email.
        </p>

        <p>
          Thanks,<br>
          E-Commerce Team
        </p>

      </div>
    `;

    // ==================================================
    // SEND EMAIL VIA RESEND
    // ==================================================

    const { data, error } = await resend.emails.send({
      from: "Book Shop <onboarding@resend.dev>",
      // process.env.RESEND_FROM_EMAIL,
      to: user.email,
      subject: "Reset Your Password",
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({
        message:
          "Something went wrong. Please try again later.",
      });
    }

    // console.log("Password reset email sent:", data?.id);

    // Don't log resetUrl/token in production

    return res.status(200).json({
      message:
        "If an account exists with this email, a reset link has been sent.",
    });

  } catch (error) {

    console.error("Forgot password error:", error);

    return res.status(500).json({
      message:
        "Something went wrong. Please try again later.",
    });
  }
};


// ======================================================
// RESET PASSWORD
// ======================================================

const resetPassword = async (req, res) => {
  try {

    const { token } = req.params;

    const {
      password,
      confirmPassword,
    } = req.body;

    // ==================================================
    // VALIDATE PASSWORD
    // ==================================================

    if (!password || !confirmPassword) {
      return res.status(400).json({
        message:
          "Password and confirm password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters",
      });
    }

    // ==================================================
    // HASH TOKEN FROM URL
    // ==================================================

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // ==================================================
    // FIND USER
    // TOKEN MUST NOT BE EXPIRED
    // ==================================================

    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    // ==================================================
    // INVALID / EXPIRED TOKEN
    // ==================================================

    if (!user) {
      return res.status(400).json({
        message:
          "Reset link is invalid or expired",
      });
    }

    // ==================================================
    // HASH NEW PASSWORD
    // ==================================================

    const hashedPassword =
      await bcrypt.hash(password, 12);

    // ==================================================
    // UPDATE PASSWORD
    // ==================================================

    user.password = hashedPassword;

    // ==================================================
    // DELETE RESET TOKEN
    // MAKES TOKEN SINGLE-USE
    // ==================================================

    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    // ==================================================
    // SUCCESS
    // ==================================================

    return res.status(200).json({
      message:
        "Password reset successfully",
    });

  } catch (error) {

    console.error(
      "Reset password error:",
      error
    );

    return res.status(500).json({
      message:
        "Something went wrong. Please try again later",
    });
  }
};


// ======================================================
// EXPORT
// ======================================================

module.exports = {
  forgetPassword,
  resetPassword,
};