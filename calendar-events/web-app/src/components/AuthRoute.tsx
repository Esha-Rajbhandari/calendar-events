import React from "react";
import Login from "@/pages/Login";

const AuthRoute = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!!token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return <>{props.children}</>;
  }

  return <Login />;
};

export default AuthRoute;
