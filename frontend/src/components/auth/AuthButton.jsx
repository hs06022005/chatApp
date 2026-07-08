const AuthButton = ({children,loading,}) => {
    return (
        <button disabled={loading} 
            className=" w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-700 active:scale-95 disabled:opacity-60">
            {loading ? "Please wait..." : children}
        </button>
    );
};

export default AuthButton;