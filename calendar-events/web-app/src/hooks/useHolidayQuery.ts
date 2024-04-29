import React from "react";
import { fetchHolidays } from "@/features/calendar/service";

const useHolidayQuery = (timezone: string, options?: any) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, hasError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await fetchHolidays(timezone);

        const mappedData = result.map((holiday: any) => ({
          title: holiday.name,
          start: new Date(holiday.date),
          end: new Date(holiday.date),
          isHoliday: true,
        }));

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

export default useHolidayQuery;
