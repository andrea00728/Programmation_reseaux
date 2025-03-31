import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface StateContextType {
    user:any|null;
    token:string|null;
    role:string|null;
    setUser:(any:null)=>void;
    setToken:(string:string|null)=>void;
    setRole:(role:string|null)=>void;
}

const StateContext=createContext<StateContextType>({
    user:null,
    token:null,
    role:null,
    setUser:()=>{},
    setToken:()=>{},
    setRole:()=>{},
});

interface ContextProviderProps{
    children:ReactNode;
}

export const ContextProvider=({children}:ContextProviderProps)=>{
    const [user,setUser]=useState<any|null>(null);
    const [token,_setToken]=useState<string|null>(()=>sessionStorage.getItem("ACCESS_TOKEN")||null);
    const [role,_setRole]=useState<string|null>(()=>sessionStorage.getItem("USER_ROLE")||null);

    useEffect(()=>{
        console.log("token recupere par le COntextProvider:",token);
        if(!token){
            _setToken(null);
            _setRole(null);
            sessionStorage.removeItem("ACCESS_TOKEN");
            sessionStorage.removeItem("USER_ROLE");
        }
    },[token]);

    const setToken=(token:string|null)=>{
        _setToken(token);
        if(token){
            sessionStorage.setItem("ACCESS_TOKEN",token);
            _setRole(role);       
        }else{
            sessionStorage.removeItem("ACCESS_TOKEN");
            sessionStorage.removeItem("USER_ROLE");
        }
    };

    const setRole = (role: string | null) => {
        _setRole(role);
        if (role) {
          sessionStorage.setItem("USER_ROLE", role);
        } else {
          sessionStorage.removeItem("USER_ROLE");
        }
    }

    return (
        <StateContext.Provider  value={{user,token,role,setToken,setUser,setRole}}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext=()=>{
    return useContext(StateContext);
}