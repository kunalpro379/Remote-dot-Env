import React, { useState } from "react";
import { AlertCircle, X } from "react-feather";
import Card from '../styles/Card.jsx';
import { handleVerification as verifyUser } from "../controllers/AuthController.jsx";

const Verification = ({ setShowVerification, usrname }) => {
    const [verificationCode, setVerificationCode] = useState(new Array(6).fill(''));
    const [errorMessage, setErrorMessage] = useState("");
    const [notificationMsg, setNotificationMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);

            if (index < 5) {
                document.getElementById(`code-input-${index + 1}`).focus();
            }
        }
    };

    const handleClose = () => {
        if (typeof setShowVerification === 'function') {
            setShowVerification(false);
        }
    };

    const handleVerification = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 
        setNotificationMsg("");
        const codeString = verificationCode.join('');

        console.log('Verification code submitted:', codeString);

        const formData = {
            username: usrname,
            code: codeString
        };

        setLoading(true); 
        try {
            const response = await verifyUser(formData);

            if (response.statusCode === 200 || response.statusCode === 500) {
                setNotificationMsg(response.message);
                console.log(response.message);
                handleClose();
            } else {
                setErrorMessage(response.message || "An unknown error occurred.");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("An error occurred during verification.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleClose}
        >
            <div 
                className="relative"
                onClick={e => e.stopPropagation()}
            >
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Verify Your Account</h2>
                        <button 
                            onClick={handleClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            type="button"
                        >
                            <X className="w-6 h-6 text-white/80" />
                        </button>
                    </div>

                    <form onSubmit={handleVerification} className="grid grid-cols-1 gap-4">
                        <div className="flex space-x-2 mb-4">
                            {verificationCode.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-input-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    className="w-12 h-12 text-center text-2xl border border-gray-300 rounded"
                                    onFocus={(e) => e.target.select()}
                                />
                            ))}
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        {notificationMsg && <p className="text-green-500">{notificationMsg}</p>}
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Submit'}
                        </button>
                    </form>

                    {errorMessage && (
                        <div className="flex items-center gap-2 text-red-400 mt-4">
                            <AlertCircle className="w-5 h-5" />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Verification;