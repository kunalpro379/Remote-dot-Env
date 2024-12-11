import React, {createContext, useContext,useState}from 'react';

///create the auth context
const AuthContext=createContext();
//create a custom hook to use AUth Context
export const useAuth=()=>{
    return useContext(AuthContext);
}
//create AuthProvider componant

export const AuthProvider=({children})=>{
    //holding user data
    const [user, setuser]=useState(null);
    //state for errors
    const [error, setError]=useState('');
    //success
    const [success, setSuccess]=useState('');

    //fun to log in user
    const login=(userData)=>{
        //set the userdata in state
        setuser(userData);
        localStorage.setItem('user', jSON.stringify(userData));
        setSuccess('login Successfull!');
    };
    const logout=()=>{
        setuser(null);
        localStorage.removeItem('user');
        setSuccess('Logout Successfull!');
    };
    handleSignup(userData);

    //provide context vals to children componants
return(
    <AuthContext.Provider value={{user, error, success, login, logout,handleSignup}}>{children}</AuthContext.Provider>
);
};
