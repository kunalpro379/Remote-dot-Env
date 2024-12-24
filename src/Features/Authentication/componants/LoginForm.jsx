import React from "react";
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'react-feather';

const LoginForm = (
    {
        handleLogin,
        username,
        setUsername,
        password,
        setPassword,
        showError,
        setShowLoginModal,
        setShowSignupModal,
        setErrorMessage,
        errorMessage,
        notificationMsg
    }
) => {
    return (
            <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="username"
                      required
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-white/60" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Password"
                      required
                    />
                </div>
        
                {showError && (
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>Invalid credentials. Please try again.</span>
                    </div>
                )}
                  
                {errorMessage && (
                    <div className="flex items-center gap-2 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        <span>{errorMessage}</span>
                    </div>
                )}
                  
                {notificationMsg && (
                    <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span>{notificationMsg}</span>
                    </div>
                )}
        
                <button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                    Login
                </button>
                <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(false);
                      setShowSignupModal(true);
                    }}
                    className="w-full text-white/80 hover:text-white text-sm transition-colors"
                >
                    New user? Sign up
                </button>
            </form>
    )
}
export default LoginForm;