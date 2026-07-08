import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { getMessages } from "../../services/messageService";
import ChatHeader from "./ChatHeader";
const ChatWindow = () => {
    const bottomRef = useRef(null);
    const { user } = useAuth();
    const {
        selectedUser,
        messages,
        setMessages,
    } = useChat();
    useEffect(() => {
        if (!selectedUser || !user?._id) return;
        const fetchMessages = async () => {
            try {
                const data = await getMessages(
                    user._id,
                    selectedUser._id
                );
                setMessages(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMessages();
    }, [selectedUser, user]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);
    return (
        <div className="flex-1 overflow-y-auto px-6 py-5 bg-zinc-950 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:22px_22px]">
            <div className="flex justify-center mb-6">
                <span className="bg-zinc-800 text-zinc-400 text-xs px-4 py-1 rounded-full">
                    Today
                </span>
            </div>
            <div className="space-y-4">
                {messages.map((message) => (
                    <MessageBubble
                        key={message._id}
                        message={message}
                        own={message.sender === user._id}
                    />
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    );
};

export default ChatWindow;