import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout:React.FC=()=>{
    const {token,role}=useStateContext();

    if(token){
      
        if(role==='cyber'){
            return <Navigate to='/CyberDashboard' replace/>
        }
        if(role==='entreprise'){
            return <Navigate to='/EntrepriseDashboard' replace/>
        }
    };
 return (
    <div>
        <Outlet/>
    </div>
 );
};
export default GuestLayout;