import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from '../lib/cloudinary.js' ;

import bcrypt from "bcrypt";

// ========================== signup ===================
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    if (newUser) {
      // Generate token after saving user

      const token = generateToken(newUser._id, res); //res is response of newUser
      // Send success response
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =================== login =====================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credential!" });
    }

    // Validate password
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: "Invalid Credential!!" });
    }

    // Generate token
    const token = generateToken(user._id, res);

    // Send success response
    res.status(200).json({
      _id: user._id,
      email: user.email,
      profilePic: user.profilePic,
      token,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ======================== logout ====================
export const logout = (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logout successfully"})
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });

  }
};

// ==================== updateProfile====================
export const updateProfile = async(req,res) => {
  try {
    const {profilePic} = req.body ;
    const userId = res.user._id;
    if(!profilePic){
      return res.status(400).json({message:"Profile pic is required"});
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
     const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:True}) ;
     res.status(200).json(updateUser)
  } catch (error) {
    console.log("updated error",error.message);
    res.status(500).json({ message: "Internal Server Error" });  
  }
}

// ==================== checkAuth ==========================
export const checkAuth = async(req,res ) => {
  try {
    res.status(200).json(req.user)
    
  } catch (error) { 
    console.log("error in checkauth controller",error.message);
    res.status(500).json({ message: "Internal Server Error" });  

  }
}