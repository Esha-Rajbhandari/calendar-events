import { Navigate } from "react-router-dom";

const AuthRoute = (props: any) => {
  const isLoggedIn = localStorage.getItem("token");

  if (isLoggedIn) {
    return <>{props.children}</>;
  }

  return <Navigate to={"/login"} />;
};

export default AuthRoute;
