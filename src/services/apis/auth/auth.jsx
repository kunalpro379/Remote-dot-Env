//here
import axios from "axios";
import { SIGNUP_URL, SIGNIN_URL, VERIFY_URL, LOGOUT_URL, JWT, BASE_API_URL, } from "./api.config.js";

export const signup=async (userData)=>{
    try{
        const response=await axios.post(SIGNUP_URL,userData);
        return response.data;
    }catch(error){
        handleAPIError(error);
    }
}
export const signin=async (userData)=>{
    try{
        const response=await axios.post(SIGNIN_URL,userData);
        return response.data;
    }catch(error){
        handleAPIError(error);
    }
}
export const verify=async(userData)=>{
try{
    const response=await axios.post(VERIFY_URL,userData);
    return response.data;
}catch(error){
    handleAPIError(error);
}
}
export const logout=async(userData)=>{
try{
    const response=await axios.post(LOGOUT_URL,userData);
    return response.data;
}catch(error){
    handleAPIError(error);
}
}
export const validateJWT=async(token)=>{
    try{
        const response=await axios.post(JWT,token);
        return response.data;
    }catch(error){
        handleAPIError(error);
    }
}

