import React from "react";
import { NavigateFunction } from "react-router-dom";
import axiosCLient from "../api/axios-client";

interface AuthonticationService{
    usernameRef:React.RefObject<HTMLInputElement|null>;
    emailRef:React.RefObject<HTMLInputElement|null>;
    passwordRef:React.RefObject<HTMLInputElement|null>;
    setUser:(user:any)=>void;
    setToken:(token:string)=>void;
    setSuccess:(message:string)=>void;
    setError:(message:string|null)=>void;
    setLoading:(message:boolean)=>void;
    navigate:NavigateFunction;
}

export const RegisterService=async (
    event:React.FormEvent<HTMLFormElement>,
    {
        usernameRef,
        emailRef,
        passwordRef,
        setUser,
        setToken,
        setSuccess,
        setError,
        setLoading,
        navigate,
    }:AuthonticationService
)=>{
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');

    const formData=new FormData();
    formData.append('username', usernameRef.current?.value||'');
    formData.append('email',emailRef.current?.value||'');
    formData.append('password',passwordRef.current?.value||'');

    try{
        const {data}=await axiosCLient.post('/register',formData,{
            headers:{'Content-Type':'multipart/form-data'},
        });
        setUser(data.user);
        setToken(data.token);
        setSuccess("compte creer avec success");
        navigate('/login');
    }catch(err:any){
        setError(err.response?.data?.message||'une erreur est survenue lors de l\'inscription');
    }finally{
        setLoading(false);
    }
};

export const LoginService=async(
    event:React.FormEvent<HTMLFormElement>,
    {
        emailRef,passwordRef,setError,setLoading,setToken,setUser,navigate,setSuccess,
    }:AuthonticationService
)=>{
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');

    const payloads={
        email:emailRef.current?.value?.trim||'',
        password:passwordRef.current?.value||'',
    };
    if(!payloads.email || !payloads.password){
        setError("tout les champs doivent etre remplis");
        setLoading(false);
        return;
    }
    try {
        const { data } = await axiosCLient.post('/login', payloads);
        console.log('Réponse API:', data); 
    
        // setUser({ data.user }); 
        // setToken( data.token);
        setUser({ email: data.data?.email || data.email }); 
        setToken(data.data?.token || data.token);
        setSuccess(data.message || 'Connexion réussie !');
        navigate('/dashboard');
      } catch (err: any) {
        console.log('Erreur capturée:', err); 
        const errorMessage = err.response?.data?.message || 'Erreur lors de la connexion';
        setError(errorMessage); // Affiche "Mot de passe incorrect" ici
      } finally {
        setLoading(false);
      }
};
