import { Search, LogOut, Settings } from "lucide-react";
import { useEffect, useState } from "react";

import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { getAllUsers } from "../../services/userService";

const Sidebar = () => {
    const { user } = useAuth();

    const {
        selectedUser,
        setSelectedUser,
        onlineUsers,
    } = useChat();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(Array.isArray(data) ? data : data.users || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <aside className="w-80 bg-zinc-900 border-r border-zinc-800 flex flex-col">

            {/* Header */}
            <div className="h-20 px-5 flex items-center justify-between border-b border-zinc-800">

                <div className="flex items-center gap-3">

                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="h-12 w-12 rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div>
                        <h2 className="text-white font-semibold">
                            {user?.username || "User"}
                        </h2>

                        <p className="text-sm text-green-400">
                            Online
                        </p>
                    </div>
                </div>

                <Settings
                    size={20}
                    className="text-zinc-400 cursor-pointer hover:text-white"
                />

            </div>

            {/* Search */}
            <div className="p-4 border-b border-zinc-800">

                <div className="flex items-center bg-zinc-800 rounded-xl px-3 py-2">

                    <Search
                        size={18}
                        className="text-zinc-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="ml-3 w-full bg-transparent outline-none text-white placeholder:text-zinc-500"
                    />

                </div>

            </div>

            {/* Users */}
            <div className="flex-1 overflow-y-auto">

                {loading ? (

                    <p className="text-center text-zinc-400 mt-5">
                        Loading users...
                    </p>

                ) : (

                    users.map((chatUser) => (

                        <div
                            key={chatUser._id}
                            onClick={() => setSelectedUser(chatUser)}
                            className={`flex items-center gap-3 px-4 py-4 cursor-pointer transition hover:bg-zinc-800 ${
                                selectedUser?._id === chatUser._id
                                    ? "bg-zinc-800"
                                    : ""
                            }`}
                        >

                            <div className="relative">

                                {chatUser.avatar ? (

                                    <img
                                        src={chatUser.avatar}
                                        alt={chatUser.username}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />

                                ) : (

                                    <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                                        {chatUser.username
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                )}

                                {onlineUsers.includes(chatUser._id) && (
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-zinc-900"></span>
                                )}

                            </div>

                            <div className="flex-1">

                                <h3 className="text-white font-medium">
                                    {chatUser.username}
                                </h3>

                                <p className="text-sm text-zinc-400 truncate">
                                    {chatUser.email}
                                </p>

                            </div>

                        </div>

                    ))

                )}

            </div>

            {/* Logout */}
            <button
                className="h-16 border-t border-zinc-800 flex items-center justify-center gap-2 text-red-400 hover:bg-zinc-800 transition"
            >
                <LogOut size={18} />
                Logout
            </button>

        </aside>
    );
};

export default Sidebar;