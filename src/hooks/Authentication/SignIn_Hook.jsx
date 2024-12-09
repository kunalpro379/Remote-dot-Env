import { useState } from "react";
import {useNavigate} from "react-router-dom";

// const SIGNIN_URL = process.env.REACT_APP_SIGNIN_URL_AWS;
const SIGNIN_URL="";
const X_API_KEY="";
function useSignin(){
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const signin=async (username, password)=>{
        setError(null);
        try{
            const response =await fetch(SIGNIN_URL, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'x-api-key': X_API_KEY
                }, body:JSON.stringify  ({username, password})
                
            });
        }catch(e){
            console.error(e);
            setError(err.message);
        }
    };

}