import express from "express";
import {
  registerOrLogin,
  submitKYC,
  logout,
  getProfile,
  verifyOtp,
  resendOtp,
  submitUserName,
  uploadAvatar,
} from "../controller/authController.js";
import { upload } from "../middleware/multer.middleware.js";
import authenticateUser from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/register", registerOrLogin);
router.post("/verify", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/username", authenticateUser, submitUserName);
router.post("/logout", authenticateUser, logout);
router.get("/profile", authenticateUser, getProfile);
router.post(
  "/upload-image",
  authenticateUser,
  upload.single("avatar"),
  uploadAvatar
);

export default router;
