import React, { useRef, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { EntrepriseRegisterService } from "../../services/Authontication";
import {AlertTitle, TextField} from '@mui/material';
const EntrepriseRegister:React.FC=()=>{
    const usernameRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const {setToken,setUser,setRole}=useStateContext();
    const [success,setSuccess]=useState<string>('');
    const [error,setError]=useState<string|null>(null);
    const [loading,setLoading]=useState<boolean>(false);
    const navigate=useNavigate();

    const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        EntrepriseRegisterService(event,{
            usernameRef,emailRef,passwordRef,setUser,setRole,setToken,setSuccess,setError,setLoading,navigate,
        }); 
    };
 return (
    <div>
        <div>
            {error && <AlertTitle color="read">{error}</AlertTitle>}
            {success && <AlertTitle color="green">{success}</AlertTitle>}
        </div>
     <form onSubmit={onSubmit}>
     <div className="space-y-12 gap-7 mx-auto   grid w-120 mt-10">
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
         <div>
    <button 
        className="bg-[#210F37] text-white mx-auto rounded-full w-120 m-aut h-10 cursor-pointer rounded-full"
        type="submit"
        >cree compte
        </button>
    </div>
    </div>
     </form>
    </div>
 );
};
export default EntrepriseRegister;