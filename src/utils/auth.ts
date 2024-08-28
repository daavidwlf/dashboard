import { createSignal } from "solid-js";
import API from "../data/API";
import { AxiosError, AxiosResponse } from "axios";

const [isAuthenticated, setIsAuthenticated] = createSignal(false);

const validateToken = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("xJwtToken");
    const adminId = localStorage.getItem("adminId");

    if (adminId == null || token == null) {
      setIsAuthenticated(false);
      resolve(false);
      return;
    }

    console.log(token)
    console.log(adminId)

    API.POST(
      "/admin/validateJWT",
      {
        "adminId": adminId,
        "xJwtToken": token,
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