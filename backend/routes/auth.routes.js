import express from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";
import { sentOtp, verifyOtp, resetPassword } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);
authRouter.post("/send-otp", sentOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);


export default authRouter;