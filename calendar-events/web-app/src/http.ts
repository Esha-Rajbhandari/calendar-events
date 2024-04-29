import axios from "axios";

const BASE_URL = "http://localhost:3000/";

const http = axios.create({ baseURL: BASE_URL });

const baseHeader = {
  "Content-Type": "application/json",
};

const get = (url: string, customHeaders?: any) => {
  return http.get(url, { ...baseHeader, ...customHeaders });
};

const post = (url: string, data: any, customHeaders?: any) => {
  return http.post(url, data, { ...baseHeader, ...customHeaders });
};

const patch = (url: string, data: any, customHeaders?: any) => {
  return http.patch(url, data, { ...baseHeader, ...customHeaders });
};

const remove = (url: string, customHeaders?: any) => {
  return http.delete(url, { ...baseHeader, ...customHeaders });
};

export { get, post, patch, remove };
