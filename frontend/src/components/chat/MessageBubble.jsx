import { CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

const MessageBubble = ({ message, own }) => {

    const time = new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.25,
            }}
            className={`flex ${
                own ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:scale-[1.02]
                ${
                    own
                        ? "bg-indigo-600 rounded-br-md text-white"
                        : "bg-zinc-800 rounded-bl-md text-white"
                }`}
            >
                {message.text && (
                    <p className="leading-relaxed">
                        {message.text}
                    </p>
                )}

                {message.image && (
                    <img
                        src={message.image}
                        alt="sent"
                        className="rounded-xl max-w-xs mt-2"
                    />
                )}

                {message.audio && (
                    <audio controls className="mt-2">
                        <source src={message.audio} />
                    </audio>
                )}

                <div className="flex justify-end items-center gap-1 mt-2">

                    <span className="text-[11px] opacity-70">
                        {time}
                    </span>

                    {own && (
                        <CheckCheck
                            size={14}
                            className={`${
                                message.seen
                                    ? "text-blue-300"
                                    : "opacity-80"
                            }`}
                        />
                    )}

                </div>
            </div>
        </motion.div>
    );
};

export default MessageBubble;