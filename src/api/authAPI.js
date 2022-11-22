import instance from "./axiosClient";

class AuthAPI {
  login = (params) => {
    const url = "/auth/login";
    return instance.post(url, params);
  };
  register = (params) => {
    const url = "/auth/register";
    return instance.post(url, params);
  };
}

const authAPI = new AuthAPI();
export default authAPI;
