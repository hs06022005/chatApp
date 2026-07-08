import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingUser, setTypingUser] = useState("");

    return (
        <ChatContext.Provider
            value={{
                selectedUser,
                setSelectedUser,

                messages,
                setMessages,

                onlineUsers,
                setOnlineUsers,

                typingUser,
                setTypingUser,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);