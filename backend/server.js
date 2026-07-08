import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

import app from "./src/app.js";
import setupSocket from "./src/socket/socket.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

setupSocket(io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});