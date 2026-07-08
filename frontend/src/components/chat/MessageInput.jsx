import {Smile,Paperclip,Send,Mic,} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { sendMessage } from "../../services/messageService";
import { useSocket } from "../../context/SocketContext";

const MessageInput = () => {
    const { user } = useAuth();
    const { socket } = useSocket();
    const {selectedUser,setMessages,} = useChat();
    const [text, setText] = useState("");
    const handleSend = async () => {
        if (!selectedUser) return;
        if (!user?._id) return;
        if (!text.trim()) return;
        try {
            const message = await sendMessage({
                sender: user._id,
                receiver: selectedUser._id,
                text,
            });
            setMessages((prev) => [
                ...prev,
                message,
            ]);
            socket.emit("sendMessage", {
                ...message,
                receiverId: selectedUser._id,
            });
            setText("");
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="h-20 bg-zinc-900 border-t border-zinc-800 px-5 flex items-center gap-4">
            <button className="text-zinc-400 hover:text-white">
                <Smile size={22} />
            </button>

            <button className="text-zinc-400 hover:text-white">
                <Paperclip size={22} />
            </button>

            <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-zinc-800 rounded-full px-5 py-3 outline-none text-white placeholder:text-zinc-500"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {

                    if (e.key === "Enter") {
                        handleSend();
                    }
                }}
            />

            <button className="text-zinc-400 hover:text-white">
                <Mic size={22} />
            </button>

            <button
                onClick={handleSend}
                className="h-11 w-11 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 transition"
            >

                <Send
                    size={18}
                    className="text-white"
                />

            </button>
        </div>
    );
};

export default MessageInput;