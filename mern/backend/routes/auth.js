const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const { sendverificationcode } = require("../middlewares/Email");

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "1h",
  });
}

// Register (save user with name, email, password - no OTP)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const existuser = await User.findOne({ email });

    if (existuser)
      return res.status(400).json({
        message: "user already exist",
      });

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const verificationcode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationcode,
    });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
});

// Login Step 1: Accept email + password, send OTP to email
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Generate new OTP
    const verificationcode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    user.verificationcode = verificationcode;
    await user.save();

    // Send OTP to email
    sendverificationcode(user.email, user.verificationcode);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// Login Step 2: Verify OTP and return JWT token
router.post("/verify-login", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        message: "email and code are required",
      });
    }

    const user = await User.findOne({ email, verificationcode: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired code",
      });
    }

    // Clear OTP after successful verification
    user.verificationcode = undefined;
    user.isverfied = true;
    await user.save();

    // Generate JWT token
    const token = signToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
