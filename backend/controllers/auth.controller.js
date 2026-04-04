import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import { genToken } from "../utils/token.js";

const signUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        if (mobile.length !== 10) {
            return res.status(400).json({ message: "Mobile number must be 10 digits" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            mobile,
            role
        });

        const token = await genToken(newUser._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(201).json({ message: "User registered successfully", token });

    } catch (error) {
        return res.status(500).json({ message: `sign up error ${error.message}` });
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });
        return res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        return res.status(500).json({ message: `sign in error ${error.message}` });
    }
}

const signOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Log Out Successfully" });
    } catch (error) {
        return res.status(500).json({ message: `sign out error ${error.message}` });
    }
}

export { signUp, signIn, signOut };