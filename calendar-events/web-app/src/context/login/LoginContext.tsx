import { createContext } from "react";

interface LoginContextProps {
  user: any;
  loggedIn: boolean;
  checkLoginState: () => void;
}

const INITIAL_VALUE: LoginContextProps = {
  user: null,
  loggedIn: false,
  checkLoginState: () => {},
};

const LoginContext = createContext<LoginContextProps>(INITIAL_VALUE);

export default LoginContext;
