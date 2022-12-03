import request from "./axiosClient";

class PlaylistAPI {
  getListPlaylist = () => {
    const url = "/playlist";
    return request.get(url);
  };

  createPlaylist = (params) => {
    const url = "/playlist/create";
    return request.post(url, params);
  };

  addMusicToPlaylist = (params) => {
    const url = "/playlist/add";
    return request.post(url, params);
  };

  getDetailPlaylist = (params) => {
    const url = "/playlist/detail";
    return request.post(url, params);
  };

  deleteMusicFromPlaylist = (params) => {
    const url = "/playlist/remove";
    return request.post(url, params);
  };
}

const playlistAPI = new PlaylistAPI();
export default playlistAPI;
