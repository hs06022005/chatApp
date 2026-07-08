export default function MemberItem({ member }) {
    return(
        <div className="flex items-center gap-3 p-2">
            <img
                src={member.profilePic}
                className="w-10 h-10 rounded-full"
            />

            <div>
                <p className="text-white">
                    {member.name}
                </p>

                <p className="text-xs text-gray-400">
                    {member.email}
                </p>
            </div>
        </div>
    )
}