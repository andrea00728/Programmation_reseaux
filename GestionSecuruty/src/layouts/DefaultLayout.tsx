import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const DefaultLayout:React.FC=()=>{
    const {token}=useStateContext();

    if(!token){
        return <Navigate to='/login'/>
    }
 return (
    <div>
        <Outlet/>
    </div>
 );
};
export default DefaultLayout;