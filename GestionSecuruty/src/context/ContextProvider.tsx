import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface StateContextType {
    user:any|null;
    token:string|null;
    setUser:(any:null)=>void;
    setToken:(string:string|null)=>void;
}

const StateContext=createContext<StateContextType>({
    user:null,
    token:null,
    setUser:()=>{},
    setToken:()=>{},
});

interface ContextProviderProps{
    children:ReactNode;
}

export const ContextProvider=({children}:ContextProviderProps)=>{
    const [user,setUser]=useState<any|null>(null);
    const [token,_setToken]=useState<string|null>(()=>sessionStorage.getItem("ACCESS_TOKEN")||null);

    useEffect(()=>{
        console.log("token recupere par le COntextProvider:",token);
        if(!token){
            _setToken(null);
            sessionStorage.removeItem("ACCESS_TOKEN");
        }
    },[token]);

    const setToken=(token:string|null)=>{
        _setToken(token);
        if(token){
            sessionStorage.setItem("ACCESS_TOKEN",token);        
        }else{
            sessionStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider  value={{user,token,setToken,setUser}}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext=()=>{
    return useContext(StateContext);
}