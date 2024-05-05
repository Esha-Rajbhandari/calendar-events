import * as http from "../http";
import LoginContext from "@/context/login/LoginContext";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const called = useRef(false);
  const { checkLoginState, loggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const fetchToken = async () => {
    if (!loggedIn) {
      try {
        if (called.current) {
          return;
        } // prevent rerender caused by StrictMode

        called.current = true;
        await http.get(
          `${import.meta.env.VITE_API_ENDPOINT}/auth/token${
            window.location.search
          }`
        );

        checkLoginState();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchToken();
  }, [loggedIn, checkLoginState]);

  if (loggedIn) {
    return <>{navigate("/home")}</>;
  }

  return <>{navigate("/")}</>;
};

export default Redirect;
