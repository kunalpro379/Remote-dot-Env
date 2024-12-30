import React, { useState } from "react";
import { Mail, Lock, AlertCircle, X, User } from "react-feather";
import { handleSignin, handleToken } from "../controllers/AuthController";
import LoginForm from "../componants/LoginForm";
import { useAuth } from "../controllers/AuthContext";
import SuccessMessage from "../componants/SuccessMessage"; // Ensure SuccessMessage is imported
import Loading  from '../../../RemotedotEnv/componants/Loading';
const LoginModal = ({ setShowLoginModal, setShowSignupModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [notificationMsg, setNotificationMsg] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [showVerifyForm, setShowVerifyForm] = useState(false); 
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { authState, setAuthInfo } = useAuth(); // Ensure useAuth is correctly used

  const LoginHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setNotificationMsg(""); 
    const formData = {
      username: username,
      password: password,
    };
    
    console.log(formData);
    setLoading(true); 
    try {
      // Sign in
      const response = await handleSignin(formData);
      const responseBody = JSON.parse(response.body);
      if (response.statusCode === 200) {
        setShowVerifyForm(true);
        const token = `Bearer ${responseBody.token}`;
        console.log(token);

        // Validate token
        const responseValidation = await handleToken(token);
        console.log(responseValidation.body);
        if (responseValidation.statusCode === 200) {
          const payload = JSON.parse(responseValidation.body);
          //  Set authentication info
          setAuthInfo(token, payload);
          setShowLoginModal(false);
          // payload['cognito:username']
          console.log("------>>>>>>>>>>>>>",payload);
          setTimeout(() => {
            setLoading(false);
            setShowSuccessMessage(true);
            setNotificationMsg('Successfully Signed in!'); 
          }, 3000);
        } else {
          setErrorMessage("Token validation failed.");
        }
      } else {
        setErrorMessage(responseBody.error || "An unknown error occurred.");
      }
    } catch (e) {
      console.log(e);
      setErrorMessage("An error occurred during login.");
    }
    setLoading(false);
  };

  return (
    <>
      {showSuccessMessage && (
        <SuccessMessage
          message={notificationMsg}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Login</h2>
            <button
              onClick={() => setShowLoginModal(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white/80" />
            </button>
          </div>
          {loading ? (<Loading />)
          //  (
          //   <div className="flex justify-center items-center h-64">
          //     <div className="loader"></div>
          //     <div className="text-white mt-4">Loading...</div> {/* Loading card */}
          //   </div>
          // ) 
          : (
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showError={showError}
              setShowLoginModal={setShowLoginModal}
              setShowSignupModal={setShowSignupModal}
              handleLogin={LoginHandler}
              setErrorMessage={setErrorMessage}
              errorMessage={errorMessage}
              notificationMsg={notificationMsg}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LoginModal;