// src/Features/Authentication/componants/FormInput.jsx
import React from 'react';
import { User, Mail, Lock } from 'react-feather';

const FormInput = ({ type, value, onChange, placeholder, icon, required }) => {
    const renderIcon = () => {
        switch (icon) {
            case "User":
                return <User className="absolute left-3 top-3 w-5 h-5 text-white/60" />;
            case "Mail":
                return <Mail className="absolute left-3 top-3 w-5 h-5 text-white/60" />;
            case "Lock":
                return <Lock className="absolute left-3 top-3 w-5 h-5 text-white/60" />;
            default:
                return null;
        }
    };

    return (
        <div className="relative">
            {renderIcon()}
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default FormInput;