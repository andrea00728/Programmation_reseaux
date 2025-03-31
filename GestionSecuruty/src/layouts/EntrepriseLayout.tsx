import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const EntrepriseLayout:React.FC=()=>{
    const {token,role}=useStateContext();

    if(!token){
        return <Navigate to='/login'    replace/>
    }

    if(role==='cyber'){
        <Navigate to='/CyberDashboard'  replace/>
    }
 return (
    <div>
        <Outlet/>
    </div>
 );
};
export default EntrepriseLayout;