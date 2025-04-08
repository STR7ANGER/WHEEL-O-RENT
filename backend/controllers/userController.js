import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      userId: user._id.toString(),
      name: user.name,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};


export { loginUser, registerUser };