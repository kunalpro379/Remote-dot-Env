import React, {useState} from 'react';
import {useAuth} from '../controllers/AuthContext.jsx';
import {handleSignup} from '../controllers/AuthController.jsx';
import User from '../model/user.model.jsx';
const AuthView=()=>{
const{login, logout}=useAuth();
const [isSignup, setIsSignup]=useState(true);
const [user, setUser]=useState({});
//any change?
const handleChange=(e)=>{
    const {name, value}=e.target;
    setUser(prevUser=>({
        ...prevUser,
        [name]:value//if updates in specific field in the user instance
    }));
};


}