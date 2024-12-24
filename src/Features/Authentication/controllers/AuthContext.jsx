import React, { useState } from "react";
import Cookies from "js-cookie";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        token: null
    });

    const setAuthInfo = (token, user) => {
        setAuthState({
            isAuthenticated: true,
            user: user,
            token: token
        });
        Cookies.set("token", token, { httpOnly: true });
        console.log('authcontext', token);
        //decode the token for expiry 
        const decodedToken=JSON.parse(atob(token.split('.')[1]));
        console.log(decodedToken);
        const expirationTime=decodedToken.exp*1000;//ms
        //timeout
        const currentTime= Date.now();
        const timeUntilExpiration=expirationTime-currentTime;
        setTimeout(()=>{
            logout();
            console.log('"Session expired. Please log in again.');

        }, timeUntilExpiration);
         
    };

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            user: null,
            token: null
        });
        Cookies.remove("token");
    };

    return (
        <AuthContext.Provider value={{ authState, setAuthInfo, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);