// src/Features/Authentication/componants/Card.jsx
import React from 'react';

const Card = ({ children }) => {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-white/10">
            {children}
        </div>
    );
};

export default Card;
