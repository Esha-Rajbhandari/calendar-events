import * as http from "../http";
import { Button } from "@/shadcn/ui/button";

const Login = () => {
  const handleLogin = async () => {
    try {
      // Gets authentication url from backend server
      const {
        data: { url },
      } = await http.get(`${import.meta.env.VITE_API_ENDPOINT}/auth/url`);
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
