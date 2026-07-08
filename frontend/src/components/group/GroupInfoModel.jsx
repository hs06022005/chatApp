import { X } from "lucide-react";
import MemberItem from "./MemberItem";
export default function GroupInfoModal({open,onClose,members=[]}){
    if(!open) return null;
    return(
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-[#1E1E2E] w-[450px] rounded-2xl p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl text-white">
                        Group Members
                    </h2>

                    <button onClick={onClose}>
                        <X className="text-gray-400"/>
                    </button>

                </div>
                <div className="mt-5 space-y-2">
                    {
                        members.map((member)=>(
                            <MemberItem
                                key={member._id}
                                member={member}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}