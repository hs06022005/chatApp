import { X } from "lucide-react";

export default function AddMemberModal({ open,onClose }){
    if(!open) return null;
    return(
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-[#1E1E2E] rounded-2xl p-6 w-150">
                <div className="flex justify-between">

                    <h2 className="text-white text-xl">
                        Add Members
                    </h2>

                    <button onClick={onClose}>
                        <X className="text-gray-400"/>
                    </button>

                </div>

                <input
                    type="text"
                    placeholder="Search User..."
                    className="mt-5 w-full p-3 rounded-lg bg-[#2B2B3D] text-white outline-none"
                />

                <button
                    className="mt-6 w-full bg-indigo-600 py-3 rounded-lg text-white"
                >
                    Add Selected Members
                </button>
            </div>
        </div>
    )
}