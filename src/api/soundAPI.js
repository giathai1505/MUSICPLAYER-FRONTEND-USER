import request from "./axiosClient";

class SoundAPI {
  addToFavorite = (params) => {
    const url = "/user/add-favorite";
    return request.post(url, params);
  };
  removeFromFavorite = (params) => {
    const url = "/user/remove-favorite";
    return request.post(url, params);
  };
  getListFavorite = (params) => {
    const url = "/user/get-favorite";
    return request.post(url, params);
  };

  getListSound = (params) => {
    const url = "/sound/sounds";
    return request.post(url, params);
  };

  getListMusic = (params) => {
    const url = "/sound/musics";
    return request.post(url, params);
  };

  getListRank = (params) => {
    const url = "/sound/musics-ranked";
    return request.post(url, params);
  };

  getListEmotion = (params) => {
    const url = "/emotion";
    return request.post(url, params);
  };
}

const soundAPI = new SoundAPI();
export default soundAPI;
