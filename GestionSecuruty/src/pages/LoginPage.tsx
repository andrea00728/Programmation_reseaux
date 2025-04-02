import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import {AlertTitle, TextField} from '@mui/material';
import { LoginService } from "../services/Authontication";
import { useStateContext } from "../context/ContextProvider";
import { textFieldStyles } from "../utiles/style";
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
            emailRef,passwordRef,setUser,setRole,setToken,setSuccess, setError, setLoading, navigate,
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
     <div className="space-y-12 gap-7 mx-auto mt-15  grid w-120 mt-10">
        <TextField
        label="email"
        required
        id="email"
        type="email"
        name="email"
        inputRef={emailRef}
        sx={textFieldStyles}        
        />
        <TextField
        label="mot de passe "
        required
        id="password"
        type="password"
        name="password"
        inputRef={passwordRef}
        sx={textFieldStyles}
        />
            <div>
        <button type="submit"
        className="bg-cyan-800 text-black mx-auto rounded-full w-120 m-aut h-10 cursor-pointer rounded-full"
        >connexion</button>
    </div>
    </div>
     </form>
    </div>
 );
};
export default LoginPage;