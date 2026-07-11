import userModule from "../model/user.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (userId) => {
    return jwt.sign(
        {
            id: userId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Username validation
        if (username.trim().length < 3) {
            return res.status(400).json({
                message: "Username must be at least 3 characters",
            });
        }

        // Email validation
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
            });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters long",
            });
        }

        const existingUser = await userModule.findOne({
            email,
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const newUser = await userModule.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure:
                process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar,
            },
        });
    } catch (error) {
        console.error("Signup Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required",
            });
        }

        const user = await userModule.findOne({ email });

        console.log("Email received:", email);
        console.log("User found:", user);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("Password Match:", passwordMatch);

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure:
                process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure:
                process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export default {
    signup,
    login,
    logout,
};