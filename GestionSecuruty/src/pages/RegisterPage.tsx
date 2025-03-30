import React, { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { RegisterService } from "../services/Authontication";
import {AlertTitle, TextField} from '@mui/material';
const RegisterPage:React.FC=()=>{
    const usernameRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const {setToken,setUser}=useStateContext();
    const [success,setSuccess]=useState<string>('');
    const [error,setError]=useState<string|null>(null);
    const [loading,setLoading]=useState<boolean>(false);
    const navigate=useNavigate();

    const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        RegisterService(event,{
            usernameRef,
            emailRef,
            passwordRef,
            setUser,
            setToken,
            setSuccess,
            setError,
            setLoading,
            navigate,
        }); 
    };
 return (
    <div>
        <div>
            {error && <AlertTitle color="read">{error}</AlertTitle>}
            {success && <AlertTitle color="green">{success}</AlertTitle>}
        </div>
     <form onSubmit={onSubmit}>
     <div>
        <TextField
        label="pseudo"
        required
        id="username"
        name="username"
        inputRef={usernameRef}
        />
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
        <button type="submit">cree compte</button>
    </div>
     </form>
    </div>
 );
};
export default RegisterPage;