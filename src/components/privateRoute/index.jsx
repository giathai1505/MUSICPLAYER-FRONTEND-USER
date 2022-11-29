import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let accessToken = localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))
    : "";

  if (accessToken === "") return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
