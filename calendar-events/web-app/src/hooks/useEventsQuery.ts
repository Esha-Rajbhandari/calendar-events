import React from "react";
import { fetchEventsByUser } from "@/features/calendar/service";
import { mapEventsData } from "@/utils";
import LoginContext from "@/context/login/LoginContext";

const useEventsQuery = (options?: any) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, hasError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>(null);

  const { user } = React.useContext(LoginContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await fetchEventsByUser(user.email);

        const mappedData = mapEventsData(result);

        setData(mappedData);

        if (options?.onSuccess) {
          options.onSuccess((prevData: any) => [...prevData, ...mappedData]);
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

export default useEventsQuery;
