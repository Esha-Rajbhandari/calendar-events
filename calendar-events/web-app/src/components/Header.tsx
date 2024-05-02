import LoginContext from "@/context/login/LoginContext";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(LoginContext);

  return (
    <div className="w-full bg-blue-900 text-white p-4 flex flex-row-reverse fixed">
      Logged in as {user.name}
    </div>
  );
};

export default Header;
