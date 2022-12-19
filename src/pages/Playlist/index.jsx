import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import playlistAPI from "../../api/playlistAPI";
import { isLogin } from "../../assets/function/isLogin";
import { ee } from "../../components/header/Header";
import LoginDialog from "../../components/LoginDialog";
import AddPlaylistDialog from "./AddPlaylistDialog";

const listColor = [
  "#7a95b2",
  "#7a95b2",
  "#884d63",
  "#55bab9",
  "#ffb3b3",
  "#74a9ad",
];

const Playlist = () => {
  const navigate = useNavigate();
  const [openAddPlaylistDialog, setOpenAddPlaylistDialog] = useState(false);
  const [listPlaylist, setListPlaylist] = useState([]);
  const [isShowLoginDialog, setIsShowLoginDialog] = useState(false);

  const getListPlaylist = async () => {
    try {
      const result = await playlistAPI.getListPlaylist();
      if (result.success) {
        setListPlaylist(result?.playlists || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLogin()) {
      setIsShowLoginDialog(true);
    }
    getListPlaylist();
  }, []);

  const handleAddPlaylistSuccess = () => {
    //call api update list playlist
    getListPlaylist();
    setOpenAddPlaylistDialog(false);
  };
  return (
    <div className="grid grid-cols-5 gap-5">
      {listPlaylist.map((item, index) => {
        const color = listColor[Math.floor(Math.random() * 6)];
        return (
          <Link
            className={`bg-[${color}] rounded-lg cursor-pointer`}
            to={`/playlist/${item._id}`}
          >
            <div className="flex justify-center mt-2">
              <img
                src={item.image}
                alt=""
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-2 text-white">
              <p className="font-header font-bold text-lg">{item.name}</p>
              <p>{item.description}</p>
            </div>
          </Link>
        );
      })}
      <div
        className="bg-secondary h-[200px] flex items-center justify-center rounded-lg opacity-40 cursor-pointer"
        onClick={() => setOpenAddPlaylistDialog(true)}
      >
        <BsPlusLg className="text-[30px] text-white opacity-100" />
      </div>

      <AddPlaylistDialog
        isShow={openAddPlaylistDialog}
        onCancel={() => setOpenAddPlaylistDialog(false)}
        onOk={handleAddPlaylistSuccess}
      />
      <LoginDialog
        isShow={isShowLoginDialog}
        onCancel={() => setIsShowLoginDialog(false)}
        onSuccess={() => navigate("/login")}
      />
    </div>
  );
};

export default Playlist;
