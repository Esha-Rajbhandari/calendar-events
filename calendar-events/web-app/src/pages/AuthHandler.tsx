import LoginContext from "@/context/login/LoginContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthHandler = () => {
  const { loggedIn } = useContext(LoginContext);
  const { search } = useLocation();
  console.log({ loggedIn, search });

  if (loggedIn) {
    return <Navigate to="/home" replace={true} />;
  }

  return <Navigate to="/login" replace={true} />;
};

export default AuthHandler;
