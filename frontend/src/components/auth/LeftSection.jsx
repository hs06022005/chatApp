import { MessageCircle, ShieldCheck, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: ShieldCheck,
        title: "End-to-End Secure",
        subtitle: "Your privacy is our priority",
    },
    {
        icon: Zap,
        title: "Real-time Messaging",
        subtitle: "Instant delivery, always",
    },
    {
        icon: Users,
        title: "Groups & Communities",
        subtitle: "Chat in groups, share more",
    },
];

const LeftSection = () => {
    return (
        <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center">
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-purple-600/25 blur-[120px]" />
        <div className="absolute right-20 top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="max-w-xl px-12 relative z-10">

            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
            >
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <MessageCircle className="text-white" size={30} />
            </div>

            <h1 className="text-4xl font-bold text-white">
                Chat<span className="text-indigo-500">App</span>
            </h1>
            </motion.div>

            <motion.h2
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .2 }}
            className="mt-16 text-6xl font-extrabold leading-tight text-white"
            >
            Welcome
            <br />

            <span className="text-indigo-500">
                Back 👋
            </span>
            </motion.h2>

            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .35 }}
            className="mt-8 text-xl text-zinc-400 leading-9"
            >
            Connect instantly with friends,
            colleagues and communities
            around the world.
            </motion.p>

            <div className="mt-14 space-y-5">
                {features.map((item) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            whileHover={{ x: 10 }}
                            key={item.title}
                            className="flex items-center gap-5 rounded-2xl border border-zinc-800 bg-white/5 backdrop-blur-lg p-5"
                        >
                        <div className="h-14 w-14 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                            <Icon
                                className="text-indigo-400"
                                size={28}
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {item.title}
                            </h3>
                            <p className="text-zinc-400">
                                {item.subtitle}
                            </p>
                        </div>
                    </motion.div>
                    );
                })}
            </div>
        </div>
        </div>
    );
};

export default LeftSection;