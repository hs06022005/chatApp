import LeftSection from "../components/auth/LeftSection";

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#09090B] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="relative z-10 flex min-h-screen">
            <LeftSection />
            <div className="flex flex-1 items-center justify-center p-8">
            {children}
            </div>
        </div>
        </div>
    );
};

export default AuthLayout;