import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout:React.FC=()=>{
    const {token}=useStateContext();

    if(token){
        return <Navigate to='/'    replace/>
    };
 return (
    <div>
        <Outlet/>
    </div>
 );
};
export default GuestLayout;