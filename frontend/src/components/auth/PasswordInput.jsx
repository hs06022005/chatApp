import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({value,onChange,name,}) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative group">
            <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input type={show ? "text" : "password"} name={name} value={value} onChange={onChange} placeholder="Password" required
                className="w-full rounded-xl bg-zinc-900 border border-zinc-700 py-4 pl-12 pr-12 text-white
                placeholder:text-zinc-500
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20
                "
            />

            <button type="button" onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
};

export default PasswordInput;