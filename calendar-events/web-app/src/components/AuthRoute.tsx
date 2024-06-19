import LoginContext from "@/context/login/LoginContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = (props: any) => {
  const { loggedIn: isLoggedIn, checkLoginState } = useContext(LoginContext);

  React.useEffect(() => {
    checkLoginState();
  }, [isLoggedIn, checkLoginState]);

  console.log(isLoggedIn);
  if (isLoggedIn) {
    return <>{props.children}</>;
  }

  return <Navigate to="/login" />;
};

export default AuthRoute;
