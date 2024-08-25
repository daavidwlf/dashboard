import { createSignal } from "solid-js";
import API from "../api/API";
import { AxiosError, AxiosResponse } from "axios";

const [isAuthenticated, setIsAuthenticated] = createSignal(false);

const validateToken = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("X-JWT-Token");
    const adminID = localStorage.getItem("adminID");

    if (adminID == null || token == null) {
      setIsAuthenticated(false);
      resolve(false);
      return;
    }

    API.POST(
      "/admin/validateJWT",
      {
        adminID: adminID,
        "x-jwt-token": token,
      },
      (response: AxiosResponse) => {
        setIsAuthenticated(true);
        resolve(true);
      },
      (err: AxiosError) => {
        setIsAuthenticated(false);
        resolve(false);
      }
    );
  });
};

export { isAuthenticated, validateToken };