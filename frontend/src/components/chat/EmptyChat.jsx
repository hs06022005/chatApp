import { MessageCircleMore } from "lucide-react";

const EmptyChat = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="h-24 w-24 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                <MessageCircleMore
                    size={45}
                    className="text-indigo-500"
                />
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">
                Welcome to ChatApp
            </h2>

            <p className="text-zinc-400 max-w-md">
                Select a conversation from the sidebar to start chatting with your friends.
            </p>
        </div>
    );
};

export default EmptyChat;