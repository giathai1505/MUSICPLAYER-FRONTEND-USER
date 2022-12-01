import request from "./axiosClient";

class ProfileAPI {
  updateProfile = (params) => {
    const url = "/user/update";
    return request.post(url, params);
  };
}

const profileAPI = new ProfileAPI();
export default profileAPI;
