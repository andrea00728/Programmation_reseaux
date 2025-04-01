import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link, Navigate, Outlet } from "react-router-dom";

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

    const navLinks=[
        {path:'/CyberRegister',label:'Cyber'},
        {path:'/EntrepriseRegister',label:'Entreprise'},
    ];

 return (
    <div>
        <div className="flex gap-3 bg-[]">
        {navLinks.map((items)=>(
            <div>
                <Link key={items.path} to={items.path}>
                    {items.label}
                </Link>
            </div>
       ))}
        </div>
       <div>
       <Outlet/>
       </div>
    </div>
 );
};
export default GuestLayout;