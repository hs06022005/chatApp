import { useState } from "react";
import { X } from "lucide-react";

export default function CreateGroupModal({ open, onClose }) {
    const [groupName,setGroupName]=useState("");
    if(!open) return null;
    return(
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-[#1E1E2E] w-105 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        Create Group
                    </h2>

                    <button onClick={onClose}>
                        <X className="text-gray-400"/>
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e)=>setGroupName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#2B2B3D] text-white outline-none"
                />

                <button
                    className="mt-6 w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    Create Group
                </button>

            </div>
        </div>
    )
}