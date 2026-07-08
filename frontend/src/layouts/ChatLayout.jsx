import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";

const ChatLayout = () => {
    return (
        <div className="h-screen bg-zinc-950 flex overflow-hidden">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <ChatHeader />
                <ChatWindow />
                <MessageInput />
            </div>
        </div>
    );
};

export default ChatLayout;