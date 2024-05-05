import * as http from "../../http";
import LoginContext from "./LoginContext";
import { useCallback, useState } from "react";

const LoginContextProvider = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState(null);

  const checkLoginState = async () => {
    try {
      const {
        data: { loggedIn: logged_in, user },
      } = await http.get(`${import.meta.env.VITE_API_ENDPOINT}/auth/logged_in`);

      setLoggedIn(logged_in);
      user && setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LoginContext.Provider value={{ loggedIn, checkLoginState, user }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
