import React, { useState } from 'react';
import { useAuth } from '../controllers/AuthContext.jsx';
import { handleSignup, handleVerify } from '../controllers/AuthController.jsx';
import User from '../model/user.model.jsx';

const AuthView = () => {
  const { login, logout } = useAuth();
  const [isSignup, setIsSignup] = useState(true);
  const [user, setUser] = useState({});
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (isSignup) {
      if (!user.validate()) {
        setError('Invalid user data');
        return;
      }
      const signupResponse = await handleSignup(user);
      if (signupResponse) {
        setIsVerifying(true);
        setSuccessMessage('Sign-up successful. Please check your email for verification.');
      } else {
        setError('Sign-up failed. Please try again.');
      }
    } else {
      await login({ username: user.username, password: user.password });
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const verifyResponse = await handleVerify(user.email, verificationCode);
    if (verifyResponse) {
      setIsVerifying(false);
      setSuccessMessage('Verification successful. You can now log in.');
    } else {
      setError('Verification failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      {!isVerifying ? (
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={user.name || ''}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email || ''}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password || ''}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword || ''}
                onChange={handleChange}
                required
              />
            </>
          )}
          {!isSignup && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username || ''}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password || ''}
                onChange={handleChange}
                required
              />
            </>
          )}
          <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
          <button type="button" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </button>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          <input
            type="text"
            name="verificationCode"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default AuthView;
