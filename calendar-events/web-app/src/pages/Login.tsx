import { Button } from "@/shadcn/ui/button";
import { useNavigate } from "react-router-dom";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const googleLogin = useGoogleLogin({
    prompt: "consent",
    onSuccess: (codeResponse: TokenResponse) => {
      localStorage.setItem("token", codeResponse.access_token);
      navigate("/home");
    },
    onError: (err) => console.log(err),
  });

  if (isLoggedIn) {
    navigate("/home");

    return;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Button onClick={() => googleLogin()}>Sign in with Google</Button>
    </div>
  );
};

export default Login;
