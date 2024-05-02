import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
});

const baseHeader = {
  "Content-Type": "application/json",
};

const get = (url: string, params?: any, customHeaders?: any) => {
  return http.get(url, {
    params,
    headers: { ...baseHeader, ...customHeaders },
  });
};

const post = (url: string, data: any, customHeaders?: any) => {
  return http.post(url, data, { headers: { ...baseHeader, ...customHeaders } });
};

const patch = (url: string, data: any, customHeaders?: any) => {
  return http.patch(url, data, {
    headers: { ...baseHeader, ...customHeaders },
  });
};

const remove = (url: string, customHeaders?: any) => {
  return http.delete(url, { headers: { ...baseHeader, ...customHeaders } });
};

export { get, post, patch, remove };
