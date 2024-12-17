import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AgriContext } from "../../context/AgriContext";

const ProtectedRoute = ({ children }) => {
  const { logged } = useContext(AgriContext);

  return logged ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
