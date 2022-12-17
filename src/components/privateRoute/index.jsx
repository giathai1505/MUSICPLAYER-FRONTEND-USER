import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import LoginDialog from "./LoginDialog";

const PrivateRoute = ({ children }) => {
  const [isShow, setIsShow] = useState(true);
  const navigate = useNavigate();
  let accessToken = localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))
    : "";

  if (accessToken === "")
    return (
      <LoginDialog
        isShow={isShow}
        onCancel={() => setIsShow(false)}
        onSuccess={() => navigate("/login")}
      />
    );

  return children;
};

export default PrivateRoute;
