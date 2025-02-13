import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password, country, gender, dateOfBirth } = req.body;

  try {
    if (
      !fullName ||
      !email ||
      !password ||
      !country ||
      !gender ||
      !dateOfBirth
    ) {
      return res.status(400).json({ message: "Please provide all the fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      country,
      gender,
      dateOfBirth,
    });

    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      gender: newUser.gender,
      dateOfBirth: newUser.dateOfBirth,
      country: newUser.country,
    });
  } catch (error) {
    console.error("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all the fields" });
    }
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      country: user.country,
      gender: user.gender,
      dateOfBirth: user.dateOfBirthe,
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logut successfully",
    });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getAllUsers controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
