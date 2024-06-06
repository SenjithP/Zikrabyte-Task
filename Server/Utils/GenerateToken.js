import jwt from "jsonwebtoken";

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.USER_SECRET_TOKEN, {
      expiresIn: "30d",
    });
    if (token) {
      res.cookie("userjwt", token, COOKIE_CONFIG);
    } else {
      console.error("Error:", error);
      return res.status(400).json({ message: "Error generating token" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Some thing went wrong, Please try again later" });
  }
};
