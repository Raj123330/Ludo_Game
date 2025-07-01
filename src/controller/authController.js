import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
import { uploadOnCloudinary } from "../../src/util/cloudinary.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
//import { generateAndSaveOtp } from "../util/genrateAndsend.js";
// Temporary token blacklist storage (use Redis in production)
let tokenBlacklist = new Set();

const otpStore = new Map();
/*const login = async (req, res) => {
  try {
    const { mobile } = req.body;
    console.log("login(): Got request for mobile:", mobile);

    const user = await User.findOne({ where: { mobile } });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid number" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("Generated OTP:", otp);

    await client.messages.create({
      body: `Your WisdomEmpire OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: `+91${mobile}`,
    });

    console.log("OTP sent via Twilio to", mobile);

    otpStore.set(mobile, otp);

    return res.status(200).json({
      message: "OTP sent successfully",
      mobile,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};*/

const logout = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    tokenBlacklist.add(token); // Blacklist the token if needed

    // Optionally, remove the token from a database or session if you're storing it server-side

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "mobile", "walletBalance"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        id: user.id,
        username: user.username,
        mobile: user.mobile,
        walletBalance: user.walletBalance,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
};
// REGISTER/LOGIN
/*const registerOrLogin = async (req, res) => {
  try {
    const { email, mobile, username, referredBy } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mobile || mobile.length !== 10) {
      return res
        .status(400)
        .json({ message: "Enter a valid 10-digit mobile number" });
    }

    // Check email format
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }

    // Try to find existing user
    let user = await User.findOne({ where: { mobile } });

    if (!user) {
      // If user not found, username is required
      if (!username) {
        return res
          .status(400)
          .json({ message: "Username is required for new users" });
      }

      // Generate referral code
      const referralCode = `${username.toUpperCase()}${Math.floor(
        100 + Math.random() * 900
      )}`;

      // Create new user
      user = await User.create({
        email,
        mobile,
        username,
        referralCode,
        referredBy: referredBy || null,
        walletBalance: 0,
        referralBonus: 0,
        totalReferrals: 0,
      });

      // Handle referral logic
      if (referredBy) {
        const referrer = await User.findOne({
          where: { referralCode: referredBy },
        });
        if (referrer) {
          referrer.totalReferrals += 1;
          referrer.referralBonus += 50;
          referrer.walletBalance += 50;
          await referrer.save();
        }
      }
    }

    // Generate OTP

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    console.log("OTP sent (for development):", otp);

    res.status(200).json({
      message:
        user.createdAt === user.updatedAt
          ? "Registered successfully, OTP sent"
          : "OTP sent for login",
      otp, // ⚠️ Remove in production
      userId: user.id,
      mobile: user.mobile,
      username: user.username,
    });
  } catch (error) {
    console.error("Register/Login Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};*/

const registerOrLogin = async (req, res) => {
  try {
    const { email, mobile } = req.body;
    console.log("Register/Login Request:", req.body);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }
    if (!mobile || mobile.length !== 10) {
      return res
        .status(400)
        .json({ message: "Enter a valid 10-digit mobile number" });
    }

    let user = await User.findOne({ where: { mobile, email } });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    if (!user) {
      // Temporarily store OTP for new user creation later
      user = await User.create({
        email,
        mobile,
        otp,
        otpExpiresAt,
      });
    } else {
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
      await user.save();
    }

    console.log(
      "email :",
      process.env.EMAIL_USER,
      "pass",
      process.env.EMAIL_PASS
    );
    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Ludo Empire" <no-reply@ludoapp.com>',
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    return res.status(200).json({
      message: "OTP sent to your email",
      userExists: !!user.username, // if username exists, no need to ask again
      userId: user.id,
    });
  } catch (error) {
    console.error("OTP Request Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// KYC submission logic
const submitKYC = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.kycStatus = "Submitted";
    user.accountStatus = "Verified";
    await user.save();

    res.status(200).json({ message: "KYC submitted", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "KYC submission failed", error: err.message });
  }
};
// Add the missing generateAndSaveOtp function
const generateAndSaveOtp = async (mobile) => {
  try {
    const user = await User.findOne({ where: { mobile } });

    if (!user) {
      throw new Error("User not found");
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to user
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    return { otp };
  } catch (error) {
    throw error;
  }
};

/*const verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;
  console.log("your otp on ", mobile, " is", otp);
  const validOtp = otpStore.get(mobile);
  if (!validOtp || validOtp != otp) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // OTP is valid – generate token
  const user = await User.findOne({ where: { mobile } });

  const token = jwt.sign(
    { id: user.id, mobile: user.mobile },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  otpStore.delete(mobile); // clean up

  res.status(200).json({
    message: "OTP verified successfully",
    token,
    user: { id: user.id, mobile: user.mobile },
  });
};*/

const verifyOtp = async (req, res) => {
  try {
    const { id, otp, username, referredBy } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!otp) return res.status(400).json({ message: "OTP is required" });

    if (user.otp !== otp || new Date(user.otpExpiresAt) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP fields
    user.otp = null;
    user.otpExpiresAt = null;

    // If username doesn't exist, create profile
    let isNew = false;
    if (!user.username) {
      if (!username)
        return res
          .status(400)
          .json({ message: "Username required for new users" });

      const referralCode = `${username.toUpperCase()}${Math.floor(
        100 + Math.random() * 900
      )}`;

      user.username = username;
      user.referralCode = referralCode;
      user.referredBy = referredBy || null;
      user.walletBalance = 0;
      user.referralBonus = 0;
      user.totalReferrals = 0;
      isNew = true;

      // Handle referral logic
      if (referredBy) {
        const referrer = await User.findOne({
          where: { referralCode: referredBy },
        });
        if (referrer) {
          referrer.totalReferrals += 1;
          referrer.referralBonus += 50;
          referrer.walletBalance += 50;
          await referrer.save();
        }
      }
    }

    await user.save();

    return res.status(200).json({
      message: isNew ? "Registered successfully" : "Login successful",
      user: {
        id: user.id,
        mobile: user.mobile,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/*const generateAndSaveOtp = async (mobile) => {
  try {
    const user = await User.findOne({ where: { mobile } });

    if (!user) {
      throw new Error("User not found");
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP and expiry
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    // ✅ Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilioPhone,
      to: mobile.startsWith("+") ? mobile : `+91${mobile}`, // or +1... depending on your region
    });

    return { otp };
  } catch (error) {
    console.error("Error generating/sending OTP:", error.message);
    throw error;
  }
};*/
// RESEND OTP

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Your backend resend:", email);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
    await user.save();

    // Send OTP via email using Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Ludo Empire" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your OTP Code (Resent)",
      text: `Your new OTP is ${otp}. It will expire in 5 minutes.`,
    });

    return res.status(200).json({
      message: "OTP resent to your email",
      otp, // ⚠️ Remove in production
      userId: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error("Resend OTP Error:", error.message);
    res
      .status(500)
      .json({ message: "Error resending OTP", error: error.message });
  }
};

function generateRandomUsername(mobile) {
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < 5; i++) {
    randomString += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }

  return `User${mobile.substring(mobile.length - 4)}_${randomString}`;
}

const submitUserName = async (req, res) => {
  try {
    const { username, mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required." });
    }

    // Generate random username if none provided
    const finalUserName =
      username && username.trim() !== ""
        ? username.trim()
        : generateRandomUsername(mobile);

    // Find user by mobile and update the username
    const user = await User.findOne({ where: { mobile } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's username
    user.username = finalUserName;
    await user.save();

    res.status(200).json({
      message: "Username saved successfully!",
      user,
    });
  } catch (error) {
    console.error("Error saving username:", error);
    res.status(500).json({
      message: "Failed to save username",
      error: error.message,
    });
  }
};
// controllers/userController.js
const uploadAvatar = async (req, res) => {
  try {
    const avatarPath = req.file?.path;

    if (!avatarPath) {
      return res.status(400).json({ message: "No image provided" });
    }

    const uploadedImage = await uploadOnCloudinary(avatarPath);
    if (!uploadedImage?.secure_url) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    const [updated] = await User.update(
      { avatar: uploadedImage.secure_url },
      { where: { id: req.user.id } }
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ avatarUrl: uploadedImage.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  registerOrLogin,
  submitKYC,
  logout,
  getProfile,
  verifyOtp,
  resendOtp,
  submitUserName,
  uploadAvatar,
};
