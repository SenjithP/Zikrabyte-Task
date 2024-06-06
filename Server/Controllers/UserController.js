import User from "../Models/AuthenticationSchema.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Utils/GenerateToken.js";

export const userRegister = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    if (
      !userName ||
      userName.trim().length === 0 ||
      !userEmail ||
      userEmail.trim().length === 0 ||
      !userPassword ||
      userPassword.trim().length === 0
    ) {
      return res.status(400).json({ message: "Required all fields" });
    }
    let existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const userHashedPassword = await bcrypt.hash(userPassword, 10);
    const newUser = new User({
      userName,
      userEmail,
      userPassword: userHashedPassword,
    });
    const registeredUser = await newUser.save();
    if (registeredUser) {
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "User registration unsuccessfull" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Some thing went wrong, Please try again later" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const registeredUser = await User.findOne({ userEmail });
    if (!registeredUser) {
      return res
        .status(400)
        .json({ message: "User with this email has not registered" });
    }
    const checkPassword = await bcrypt.compare(
      userPassword,
      registeredUser.userPassword
    );
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    } else {
      generateToken(res, registeredUser._id);
      return res.status(200).json({
        message: "Login Success",
        userName: registeredUser.userName,
        userEmail: registeredUser.userEmail,
        userId: registeredUser._id,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Some thing went wrong, Please try again later" });
  }
};

export const userLogout = async (req, res) => {
  try {
    res.cookie("userjwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Some thing went wrong, Please try again later" });
  }
};
