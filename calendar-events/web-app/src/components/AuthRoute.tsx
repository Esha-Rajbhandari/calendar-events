import LoginContext from "@/context/login/LoginContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = (props: any) => {
  const { loggedIn: isLoggedIn } = useContext(LoginContext);

  if (isLoggedIn) {
    return <>{props.children}</>;
  }

  return <Navigate to={"/"} />;
};

export default AuthRoute;
