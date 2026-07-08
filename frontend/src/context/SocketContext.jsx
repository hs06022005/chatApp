import { createContext, useContext, useEffect } from "react";
import socket from "../socket/socket";
import { useAuth } from "./AuthContext";
import { useChat } from "./ChatContext";

const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
    const { user } = useAuth();
    const {setOnlineUsers,setMessages,setTypingUser} = useChat();
    useEffect(() => {
        if (!user?._id) return;
        socket.emit("registerUser", user._id);
        socket.emit("registerUser", user._id);
        socket.on("onlineUsers", (users) => {
            setOnlineUsers(users);
        });
        socket.on("receiveMessage", (message) => {
            setMessages((prev) => [
                ...prev,
                message,
            ]);
        });
        socket.on("userTyping", (name) => {
                setTypingUser(name);
            });

            socket.on("userStoppedTyping", () => {
                setTypingUser("");
            });
        return () => {
            socket.off("onlineUsers");
            socket.off("receiveMessage");
            socket.off("userTyping");
            socket.off("userStoppedTyping");
        };
    }, [user]);
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);