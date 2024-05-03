import React from "react";
import { fetchAllUsers } from "@/features/calendar/service";
import LoginContext from "@/context/login/LoginContext";

const useUsersQuery = (options?: any) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, hasError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>(null);

  const { user } = React.useContext(LoginContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await fetchAllUsers();

        const filteredData = result.filter(
          (rs: any) => rs.email !== user.email
        );
        const mappedData = filteredData.map((usr: any) => {
          return {
            label: usr.name,
            value: usr.email,
            isChecked: false,
          };
        });

        setData(mappedData);

        if (options?.onSuccess) {
          options.onSuccess(mappedData);
        }
      } catch (err) {
        hasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useUsersQuery;
