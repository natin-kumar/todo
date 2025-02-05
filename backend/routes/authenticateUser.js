const express = require("express");
const { registerUser, loginUser, getUserProfile,verifyOTP } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);
router.get("/profile", protect, getUserProfile);

module.exports = router;
