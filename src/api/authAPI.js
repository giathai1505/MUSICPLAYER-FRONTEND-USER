import request from "./axiosClient";

class AuthAPI {
  login = (params) => {
    const url = "/auth/login";
    return request.post(url, params);
  };

  loginWithGoogle = (params) => {
    const url = "/user/google-login";
    return request.post(url, params);
  };
  register = (params) => {
    const url = "/auth/register";
    return request.post(url, params);
  };

  changePassword = (params) => {
    const url = "/user/change-password";
    return request.post(url, params);
  };

  forgotPassword = (params) => {
    const url = "/user/forgot-password";
    return request.post(url, params);
  };

  resetPassword = (params) => {
    const url = "/user/reset-password";
    return request.post(url, params);
  };
}

const authAPI = new AuthAPI();
export default authAPI;
