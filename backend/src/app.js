import express from "express"
import dotenv from "dotenv"
import cors from "cors";
dotenv.config()
import connectDb from "./Db/db.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import chatRoutes from "./routes/chat.route.js";

const app = express()
connectDb()

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

//middelware
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/auth", authRoutes);       //register and login routes
app.use("/users", userRoutes);     //get user details and search users routes
app.use("/messages", messageRoutes);    //send and get messages routes
app.use("/chats", chatRoutes);    //get chats routes

export default app;