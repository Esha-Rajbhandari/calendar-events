import * as http from "../../http";
import { interpolate } from "./utils";

export const fetchAllEvents = async () => {
  const data = await http.get("/events/");

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
