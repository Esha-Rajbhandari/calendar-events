import LoginContext from "@/context/login/LoginContext";
import * as http from "../http";
import { Button } from "@/shadcn/ui/button";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { loggedIn } = useContext(LoginContext);
  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async () => {
    try {
      // Gets authentication url from backend server
      const {
        data: { url },
      } = await http.get(`${import.meta.env.VITE_API_ENDPOINT}/auth/google`);
      // Navigate to consent screen
      window.location.assign(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Button onClick={handleLogin}>Sign in with Google</Button>
    </div>
  );
};

export default Login;
