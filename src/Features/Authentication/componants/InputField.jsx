// src/Features/Authentication/components/InputField.jsx
import React from 'react';

const InputField = ({ type = "text", name, value, onChange, placeholder, required = false }) => {
    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default InputField;