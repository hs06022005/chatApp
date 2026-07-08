import React from "react";

const AuthInput = ({icon: Icon,type = "text",placeholder,value,onChange,name,}) => {
    return (
        <div className="relative group">
            <Icon
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition"
            />

            <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required
                className="w-full rounded-xl bg-zinc-900 border border-zinc-700 py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
        </div>
    );
};

export default AuthInput;