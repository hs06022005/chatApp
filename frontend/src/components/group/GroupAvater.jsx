export default function GroupAvatar({ name }) {
    return(
        <div
            className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold"
        >
            {name?.charAt(0).toUpperCase()}
        </div>
    )
}