import axios from "axios";
import apiConfig from './api.config.js';

const { BASE_API_URL, SIGNUP_URL, SIGNIN_URL, VERIFY_URL, LOGOUT_URL, JWT } = apiConfig;

const handleAPIError = (error) => {
    console.error("API Error:", error);
    if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
    } else if (error.request) {
        console.error("Request data:", error.request);
    } else {
        console.error("Error message:", error.message);
    }
};

export const signup=async (requestData)=>{
    try{
        console.log("signing up..., SIGNUP_URL",SIGNUP_URL);

        const response=await axios.post(SIGNUP_URL,requestData);
        console.log("wait a second...");
        return response.data;
    }catch(error){
        // handleAPIError(error);
        console.error("Signup API Error:", error); // Log the error for debugging

    }
}
export const signin=async (requestData)=>{
    try{
        const response=await axios.post(SIGNIN_URL,requestData);
        console.log("signing in...",SIGNIN_URL);
        console.log("response.data",response.data);
        return response.data;
    }catch(error){
        handleAPIError(error);
    }
}
export const verify=async(requestData)=>{
    try{
        console.log("verifying...", VERIFY_URL);
        const response=await axios.post(VERIFY_URL,requestData);
        console.log("-------->",response.data.statusCode);
        
        if (response.data.statusCode === 200 || response.data.statusCode === 500) {
            return {
                statusCode: response.data.statusCode,
                message: response.data.error || "User Verified Successfully"
            };
        } else {
            throw new Error(response.data.error || "An unknown error occurred.");
        }
    }catch (error) {
        if (error.response) {
            console.error("Verify API Error Response:", error.response.data.status);
        } else if (error.request) {
            console.error("Verify API No Response:", error.request);
        } else {
            console.error("Verify API Error:", error.message);
        }
        console.error("Verify API Error Config:", error.config);
        throw error;
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
export const validateJWT=async(requestData)=>{
    try{
        const response=await axios.post(VERIFY_URL,requestData);
        return response.data;
    }catch(error){
        console.log("JWT validation error:",error);
        return error;
    }
}

export const forgotPassword=async(email)=>{
    try{
        const response=await axios.post(BASE_API_URL,email);
        return response.data;
    }catch(error){
        handleAPIError(error);
    }
}