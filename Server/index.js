import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routes/UserRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const corsOptions = {
  origin: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/users", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  try {
    const connect = mongoose.connect(process.env.MONGO);
    if (connect) {
      console.log("MongoDB connected");
    } else {
      console.log("Some error connecting MongoDB");
    }
    console.log(`Server started running at http://localhost:${port}`);
  } catch (error) {
    console.log(error);
  }
});
