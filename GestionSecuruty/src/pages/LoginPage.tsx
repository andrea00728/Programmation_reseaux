import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import {AlertTitle, TextField} from '@mui/material';
import { LoginService } from "../services/Authontication";
import { useStateContext } from "../context/ContextProvider";
const LoginPage:React.FC=()=>{
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const {setToken,setUser,setRole,token}=useStateContext();
    const [success,setSuccess]=useState<string>('');
    const [error,setError]=useState<string|null>(null);
    const [loading,setLoading]=useState<boolean>(false);
    const navigate=useNavigate();

    const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        LoginService(event,{
            emailRef,
            passwordRef,
            setUser,
            setRole,
            setToken,
            setSuccess,
            setError,
            setLoading,
            navigate,
        }); 
    };

    useEffect(() => {
        if (token) {
          navigate('/');
        }
      }, [token, navigate]);    
 return (
    <div>
        <div>
            {error && <AlertTitle color="read">{error}</AlertTitle>}
            {success && <AlertTitle color="green">{success}</AlertTitle>}
        </div>
     <form onSubmit={onSubmit}>
     <div>
        <TextField
        label="email"
        required
        id="email"
        type="email"
        name="email"
        inputRef={emailRef}
        />
        <TextField
        label="mot de passe "
        required
        id="password"
        type="password"
        name="password"
        inputRef={passwordRef}
        />
    </div>
    <div>
        <button type="submit">connexion</button>
    </div>
     </form>
    </div>
 );
};
export default LoginPage;