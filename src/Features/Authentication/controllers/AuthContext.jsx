import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating accountId

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to parse JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  // Initialize auth state from cookie
  useEffect(() => {
    const initializeAuth = () => {
      const token = Cookies.get("token");
      
      if (token) {
        const decodedToken = parseJwt(token);
        
        if (decodedToken) {
          const currentTime = Date.now() / 1000; // Convert to seconds
          
          if (decodedToken.exp > currentTime) {
            // Token is still valid
            setAuthState({
              isAuthenticated: true,
              user: { payload: decodedToken },
              token: token
            });

            // Set up expiration timeout
            const timeUntilExpiration = (decodedToken.exp - currentTime) * 1000; // Convert to milliseconds
            setTimeout(() => {
              logout();
              console.log('Session expired. Please log in again.');
            }, timeUntilExpiration);
          } else {
            // Token is expired
            Cookies.remove("token", { path: '/' });
            logout();
          }
        }
      }
    };

    initializeAuth();
  }, []);

  const setAuthInfo = (token, user) => {
    // Remove 'Bearer ' prefix if it exists
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    // Set cookie with appropriate options
    Cookies.set("token", cleanToken, {
      path: '/',
      secure: true, // Only transmitted over HTTPS
      sameSite: 'strict'
    });

    // Generate a random accountId if not already present
    if (!user.accountId) {
      user.accountId = uuidv4();
    }

    setAuthState({
      isAuthenticated: true,
      user: user,
      token: cleanToken
    });

    // Set up expiration timeout
    const decodedToken = parseJwt(cleanToken);
    if (decodedToken) {
      const currentTime = Date.now() / 1000;
      const timeUntilExpiration = (decodedToken.exp - currentTime) * 1000;
      setTimeout(() => {
        logout();
        console.log('Session expired. Please log in again.');
      }, timeUntilExpiration);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      Cookies.remove("token", { path: '/' });
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null
      });
      setIsLoading(false);
      setErrorMessage('You have been logged out.');
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthInfo, logout, isLoading, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;