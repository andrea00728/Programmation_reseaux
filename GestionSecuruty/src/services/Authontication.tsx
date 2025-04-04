import React from "react";
import { NavigateFunction } from "react-router-dom";
import axiosCLient from "../api/axios-client";

interface AuthonticationService{
    usernameRef:React.RefObject<HTMLInputElement|null>;
    emailRef:React.RefObject<HTMLInputElement|null>;
    passwordRef:React.RefObject<HTMLInputElement|null>;
    setUser:(user:any)=>void;
    setToken:(token:string)=>void;
    setRole:(role:string)=>void;
    setSuccess:(message:string)=>void;
    setError:(message:string|null)=>void;
    setLoading:(message:boolean)=>void;

    
    navigate:NavigateFunction;
}

interface connexionService{
    emailRef:React.RefObject<HTMLInputElement|null>;
    passwordRef:React.RefObject<HTMLInputElement|null>;
    setUser:(user:any)=>void;
    setToken:(token:string)=>void;
    setRole:(role:string)=>void;
    setSuccess:(message:string)=>void;
    setError:(message:string|null)=>void;
    setLoading:(message:boolean)=>void;

    
    navigate:NavigateFunction;
}
/**
 * 
 * @param event 
 * @param param1 
 * @property Service pour l'entreprise
 */
export const EntrepriseRegisterService=async (
    event:React.FormEvent<HTMLFormElement>,
    {
        usernameRef,
        emailRef,
        passwordRef,
        setUser,
        setToken,
        setRole,
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
    formData.append('role', 'entreprise');
    try{
        const {data}=await axiosCLient.post('/auth/register',formData,{
            headers: { 'Content-Type': 'application/json' },
        });
        setUser(data.user);
        setToken(data.token);
        setRole('entreprise')
        setSuccess("compte creer avec success");
        navigate('/login');
    }catch(err:any){
        setError(err.response?.data?.message||'une erreur est survenue lors de l\'inscription');
    }finally{
        setLoading(false);
    }
};




/**
 * 
 * @param event 
 * @param param1 
 * @property Service pour les Cybers
 * @returns 
 */

export const CyberRegisterService=async (
    event:React.FormEvent<HTMLFormElement>,
    {
        usernameRef,
        emailRef,
        passwordRef,
        setUser,
        setToken,
        setRole,
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
    formData.append('role', 'cyber');
    try{
        const {data}=await axiosCLient.post('/auth/register',formData,{
            headers: { 'Content-Type': 'application/json' },
        });
        setUser(data.user);
        setToken(data.token);
        setRole('cyber')
        setSuccess("compte creer avec success");
        navigate('/login');
    }catch(err:any){
        setError(err.response?.data?.message||'une erreur est survenue lors de l\'inscription');
    }finally{
        setLoading(false);
    }
};




/**
 * 
 * @param event 
 * @param param1 
 * @property Service de connexion pour les deux role ,les deux role peut passe une connexion sur cette seul service 
 * @returns 
 */
export const LoginService=async(
    event:React.FormEvent<HTMLFormElement>,
    {
        emailRef,passwordRef,setError,setLoading,setToken,setUser,navigate,setSuccess,setRole,
    }:connexionService
)=>{
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');

    const payloads={
        email:emailRef.current?.value?.trim()||'',
        password:passwordRef.current?.value||'',
        // email: emailRef.current?.value || '',
        // password: passwordRef.current?.value || '',
    };
    console.log("Payload envoyé au backend:", payloads);
    if(!payloads.email || !payloads.password){
        setError("tout les champs doivent etre remplis");
        setLoading(false);
        return;
    }
    
    try {
        const { data } = await axiosCLient.post('/auth/login', payloads);
    
        if (!data.user) {
            throw new Error("Utilisateur non trouvé dans la réponse du serveur.");
        }
        console.log("Réponse API:", data);
        setUser(data.user);
        setToken(data.access_token);
        setRole(data.user.role);
        console.log("Rôle défini:", data.user.role);
        setSuccess(data.message || 'Connexion réussie !');
        const redirectPath =
          data.user.role === 'cyber' ? '/CyberDashboard' :
          data.user.role === 'entreprise' ? '/EntrepriseDashboard' :
          '/';
        navigate(redirectPath, { replace: true });
    } catch (err: any) {
        console.log('Erreur:', err); 
        const errorMessage = err.response?.data?.message || 'Informations incorrectes';
        setError(errorMessage);
    } finally {
        setLoading(false);
    }  
};


