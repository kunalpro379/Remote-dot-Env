import {signin, signup, logout, validateJWT, verify , forgotPassword} from "../../../services/apis/auth/auth.jsx";
import User from "../model/user.model.jsx";

export const handleSignup=async(formData)=>{
    try{
        //new instance of userModel
        const user=new User(formData, 'signup');
        if(!user.validate())throw new Error('Invalid user Data');

        const requestData={
            path:'/signup',
            body:{
                username: user.username,
                email: user.email,
                password: user.password,
                gender: user.gender,
                phonenumber: user.phonenumber,
                bio: user.bio,
                name: user.name,
                age: user.age,
                profilepic: user.profilepic

            }
        };
        //auth api call
        const response =await signup(requestData);
        return response.data;

    }catch(e){
        console.error(e);
    }
};

export const handleSignupSubmit=async(userData)=>{
    try{
        const response = await handleSignup(userData);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error during signup:', error);
    }
};

export const handleToken=async()=>{};
export const handleVerification=async()=>{};
export const handleLogout=async()=>{};
export const handleForgotPassword=async()=>{};

export const handleSignupSubmitNew=async(userData)=>{
    try{
        const response = await handleSignup(userData);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error during signup:', error);
    }
};
