const AuthCard = ({ children }) => {
    return (
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl shadow-2xl p-10">
        {children}
        </div>
    );
};

export default AuthCard;