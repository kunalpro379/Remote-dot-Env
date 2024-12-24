// SignupModal.jsx
import React, { useState } from "react";
import { X, AlertCircle } from "react-feather";
import { SignupHandler } from "../controllers/AuthController.jsx";
import '../styles/spinner.css'; 
import Card from '../styles/Card.jsx';
import SignupForm from "../componants/SignupForm.jsx";
import VerifyForm from "./Verify.jsx"; // Import VerifyForm component

const SignupModal = ({ setShowSignupModal }) => {
    const [signupName, setSignupName] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
    const [signupGender, setSignupGender] = useState("");
    const [signupPhoneNumber, setSignupPhoneNumber] = useState("");
    const [signupBio, setSignupBio] = useState("");
    const [signupAge, setSignupAge] = useState("");
    const [signupProfilePic, setSignupProfilePic] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [notificationMsg, setNotificationMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [countryCode, setCountryCode] = useState("+91"); // Default country code
    const [popupMessage, setPopupMessage] = useState("");
    const [showVerifyForm, setShowVerifyForm] = useState(false); // State to show verify form

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setNotificationMsg(""); 

        if (signupPassword !== signupConfirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        const formData = {
            username: signupUsername,
            name: signupName,
            email: signupEmail,
            password: signupPassword,
            gender: signupGender,
            phonenumber: `${countryCode}${signupPhoneNumber}`, // Include country code with "+"
            bio: signupBio,
            age: signupAge,
            profilepic: signupProfilePic,
        };

        setLoading(true); // Start loading immediately
        try {
            const response = await SignupHandler(formData);
            const responseBody = JSON.parse(response.body);
            if (response.statusCode === 200) {
                setNotificationMsg(responseBody.message);
                setShowVerifyForm(true); // Show verify form
                setNotificationMsg('');
            } else {
                setErrorMessage(responseBody.error || "An unknown error occurred.");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("An error occurred during signup.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            {!showVerifyForm ? (
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Create Account</h2>
                        <button 
                            onClick={() => setShowSignupModal(false)} 
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            disabled={loading}
                        >
                            <X className="w-6 h-6 text-white/80" />
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <SignupForm
                            signupName={signupName}
                            setSignupName={setSignupName}
                            signupUsername={signupUsername}
                            setSignupUsername={setSignupUsername}
                            signupEmail={signupEmail}
                            setSignupEmail={setSignupEmail}
                            signupPassword={signupPassword}
                            setSignupPassword={setSignupPassword}
                            signupConfirmPassword={signupConfirmPassword}
                            setSignupConfirmPassword={setSignupConfirmPassword}
                            signupGender={signupGender}
                            setSignupGender={setSignupGender}
                            signupPhoneNumber={signupPhoneNumber}
                            setSignupPhoneNumber={setSignupPhoneNumber}
                            signupBio={signupBio}
                            setSignupBio={setSignupBio}
                            signupAge={signupAge}
                            setSignupAge={setSignupAge}
                            signupProfilePic={signupProfilePic}
                            setSignupProfilePic={setSignupProfilePic}
                            countryCode={countryCode}
                            setCountryCode={setCountryCode}
                            handleSignup={handleSignup}
                            loading={loading}
                        />
                    )}

                    {errorMessage && (
                        <div className="flex items-center gap-2 text-red-400 mt-4">
                            <AlertCircle className="w-5 h-5" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {notificationMsg && (
                        <div className="mt-4 text-center text-green-400">
                            {notificationMsg}
                        </div>
                    )}

                    {popupMessage && (
                        <div className="fixed inset-0 flex items-center justify-center z-30">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                                <h3 className="text-xl font-semibold mb-4">Notification</h3>
                                <p>{popupMessage}</p>
                            </div>
                        </div>
                    )}
                </Card>
            ) : (
                <VerifyForm usrname={signupUsername} /> 
            )}
        </div>
    );
};

export default SignupModal;