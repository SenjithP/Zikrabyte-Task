import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
} from "../Controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);

export default userRouter;
