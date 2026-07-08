import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, MessageCircle } from "lucide-react";
import { signup } from "../../services/authService";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await signup(formData);
            alert("Account Created Successfully");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Signup Failed");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="w-full max-w-md bg-zinc-900 rounded-3xl shadow-xl p-8">
            <div className="flex flex-col items-center mb-8">
                <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center">
                <MessageCircle
                    className="text-white"
                    size={30}
                />
                </div>

                <h1 className="text-3xl font-bold text-white mt-4">
                Create Account
                </h1>

                <p className="text-zinc-400 mt-2">
                Join ChatApp today
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                    <User
                        size={20}
                        className="absolute left-4 top-4 text-zinc-400"
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white outline-none"
                    />
                </div>

                <div className="relative">
                    <Mail size={20} className="absolute left-4 top-4 text-zinc-400"/>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white outline-none"
                    />
                </div>

                <div className="relative">
                    <Lock size={20} className="absolute left-4 top-4 text-zinc-400"/>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white outline-none"
                    />
                </div>

                <button disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-xl text-white font-semibold"
                >
                    {loading ? "Creating..." : "Create Account"}
                </button>

            </form>

            <p className="text-center text-zinc-400 mt-6">
                Already have an account?
                <Link
                    to="/login"
                    className="text-indigo-500 ml-2"
                    >
                    Login
                </Link>
            </p>
        </div>

    );
};

export default Signup;