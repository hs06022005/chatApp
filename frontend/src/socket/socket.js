import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
    withCredentials: true,
});
socket.on("connect", () => {
    console.log("✅ Connected:", socket.id);
});
socket.on("connect_error", (err) => {
    console.log("❌ Socket Error:", err.message);
});

export default socket;