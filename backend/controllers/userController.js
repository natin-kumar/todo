const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP")
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ; 
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

const registerUser = async (req, res) => {
  
  console.log("incoming req");

  const { name, email, password } = req.body;
  console.log(name, email, password,req.body,"name")
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Generate OTP
  const otp = generateOTP();

  // Save user with OTP but unverified
  const user = await User.create({ name, email, password, otp, isVerified: false });

  if (user) {
    // Send OTP to user's email
    // await sendEmail(email, otp);

    res.status(201).json({
      message: "OTP sent to email. Please verify to complete registration.",
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.otp === otp) {
    user.isVerified = true; // Mark user as verified
    user.otp = null; // Clear OTP after verification
    await user.save();

    res.json({ message: "OTP verified. Registration successful!" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (!user.isVerified) {
      return res.status(401).json({ message: "User not verified. Please verify your OTP." });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getUserProfile = (req, res) => {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  };
  
  
module.exports = { registerUser, loginUser,getUserProfile, verifyOTP };
