import {signin, signup, logout, validateJWT, verify , forgotPassword} from "../../../services/apis/auth/auth.jsx";
import User from "../model/user.model.jsx";

export const SignupHandler=async(formData)=>{
    try{
        //new instance of userModel
        const user=new User(formData, 'signup');
        if(!user.validate())throw new Error('Invalid user Data');

        const requestData = {
            path: '/signup',
            body: {
                username: user.username,
                email: user.email,
                password: user.password,
                gender: user.gender,
                phoneNumber: user.phonenumber,

                bio: user.bio,
                name: user.name,
                age: user.age,
                profilepic: user.profilepic
            }
        };
        //auth api call
        const response = await signup(requestData);
        console.log(requestData);

        console.log(response.body);

        return response;

    }catch(e){
        console.error(e);
    }
};


export const handleSignin=async(formData)=>{
    try{
        if(!formData)throw new Error('Invalid user data');
        const requestData={
            path: '/signin',
            body: {
                username: formData.username,
                password: formData.password
            }
        };
        console.log(requestData);
        const response=await signin(requestData);
        console.log(response);

        return response;

    }catch(e){
        console.error(e);
    }}
export const handleVerification=async(formData)=>{
    try{

console.log(formData);
if(!formData)throw new Error('Invalid verification code');
const requestData={
    path: '/verify',
    body: {
        username: formData.username,
        code: formData.code
    }
}
console.log(requestData);

const response=await verify(requestData);


return response;
    }catch(e){
        console.error(e);
    }
};
export const handleToken=async(BearerToken)=>{
    try{

        console.log(BearerToken);
        if(!BearerToken)throw new Error('Invalid Token! try again');
        const requestData={
            path: '/validate',
            headers: {
                Authorization: BearerToken,

            }
        }
        console.log(requestData);
        
        const response=await validateJWT(requestData);
        
        
        return response;
            }catch(e){
                console.error(e);
                return e;
            }
        
        
};
export const handleLogout=async()=>{};

