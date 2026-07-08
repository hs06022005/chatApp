const SocialButton = ({icon,title,}) => {
    return (
        <button type="button"
            className="flex items-center justify-center gap-3 w-full rounded-xl border border-zinc-700 bg-zinc-900py-3 text-white transition hover:border-indigo-500 hover:bg-zinc-800">
            {icon}
            {title}
        </button>
    );
};

export default SocialButton;