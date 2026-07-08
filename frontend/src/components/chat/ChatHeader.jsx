import { Phone, Video, MoreVertical } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import { useSocket } from "../../context/SocketContext";

const ChatHeader = () => {
    const { selectedUser } = useChat();
    const { onlineUsers, typingUsers } = useSocket();

    if (!selectedUser) return null;

    const isOnline = onlineUsers?.includes(selectedUser._id);
    const isTyping = typingUsers?.includes(selectedUser._id);
    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">

        <div className="flex items-center gap-4">

            <img
            src={selectedUser.profilePic}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
            />

            <div>

            <h2 className="font-semibold text-white text-lg">
                {selectedUser.fullName}
            </h2>

            <p className="text-sm text-zinc-400">

                {isTyping
                ? "Typing..."
                : isOnline
                ? "Online"
                : "Offline"}

            </p>

            </div>

        </div>

        <div className="flex gap-4">

            <button className="p-2 rounded-full hover:bg-zinc-800">
            <Phone size={20}/>
            </button>

            <button className="p-2 rounded-full hover:bg-zinc-800">
            <Video size={20}/>
            </button>

            <button className="p-2 rounded-full hover:bg-zinc-800">
            <MoreVertical size={20}/>
            </button>

        </div>

        </div>
    );
};

export default ChatHeader;