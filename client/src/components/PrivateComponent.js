import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("token");

  return auth ? <Outlet /> : <Navigate to="/login" />; // Redirect to login instead of signup
};

export default PrivateComponent;
