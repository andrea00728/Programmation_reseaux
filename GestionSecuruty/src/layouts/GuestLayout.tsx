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

    const navLogin=[
        {path:'/login',label:'Connexion'},
    ]

 return (
    <>
        <header>
            <nav className="flex mt-2 ">
                <h4 className="ml-10  font-semibold text-2xl">lo<span className="text-[#4F1C51]">go</span></h4>
                <div className="bg-[#4F1C51] text-white w-35 h-10 p-1.5 text-center font-semibold rounded-full ml-auto mr-10">
                    {navLogin.map((item)=>(
                        <Link key={item.path} to={item.path}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
     <div className="border border-gray-300 rounded-[6%] w-[40%] h-[400px] mx-auto mt-30">
        <div className="flex gap-27  mb-5 mt-4 ">
        {navLinks.map((items)=>(
            <div className="mx-auto   text-white items-center justify-center text-center bg-[#210F37]  w-40 h-9 p-1 font-semibold rounded-full cursor-pointer">
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
    </>
 );
};
export default GuestLayout;