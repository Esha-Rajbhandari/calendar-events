import * as http from "../../http";
import { interpolate } from "../../utils";

export const fetchEventsByUser = async (email: string) => {
  const data = await http.get("/events/", { email });

  return data.data;
};

export const addEvents = async (events: any[]) => {
  const data = await http.post("/events/", events);

  return data.data;
};

export const updateEvents = async (event: any, id: number) => {
  const url = "/events/:id";
  const interpolatedURL = interpolate(url, { id });
  const data = await http.patch(interpolatedURL, event);

  return data.data;
};

export const deleteEvent = async (id: number) => {
  const url = "/events/:id";
  const interpolatedURL = interpolate(url, { id });
  const data = await http.remove(interpolatedURL);

  return data.data;
};

export const fetchHolidays = async (timezone: string) => {
  const url = "https://date.nager.at/api/v3/publicholidays/:year/:countryCode";
  const interpolatedURL = interpolate(url, { year: 2024, countryCode: "US" });
  const data = await http.get(interpolatedURL);

  return data.data;
};

export const fetchAllUsers = async () => {
  const data = await http.get("/events/users");

  return data.data;
};
