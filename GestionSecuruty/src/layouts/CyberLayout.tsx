import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const CyberLayout: React.FC = () => {
  const { token, role } = useStateContext();

 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "cyber") {
    return <Navigate to="/EntrepriseDashboard" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default CyberLayout;