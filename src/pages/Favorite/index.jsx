import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { FaMinus, FaPause, FaPlay, FaPlus } from "react-icons/fa";

import Playing from "../../components/playing/Playing";
import { ConvertSecondToMinute } from "../../assets/function/string";
import soundAPI from "../../api/soundAPI";
import ConfirmDialog from "../Music/ConfirmDialog";
import Dialog from "../../components/ConfirmDialog";
import { toast } from "react-toastify";
import { ee } from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../../assets/function/isLogin";
import LoginDialog from "../../components/LoginDialog";

export default function Favorite() {
  const navigate = useNavigate();
  const [listMusics, setListMusics] = useState([]);
  const [selectedSong, setSelectedSong] = useState();
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [selectedItemToAddToFavorite, setSelectedItemToAddToFavorite] =
    useState({});
  const [isPlay, setIsPlay] = useState(false);
  const [isShowLoginDialog, setIsShowLoginDialog] = useState(false);

  ee.on("message", function (text) {
    if (isPlay) {
      setIsPlay(false);
    }
  });

  const handleMoveNext = () => {
    let curIndex = listMusics.findIndex(
      (item) => item._id === selectedSong._id
    );
    curIndex = curIndex === listMusics.length - 1 ? 0 : ++curIndex;
    setSelectedSong(listMusics[curIndex]);
  };

  useEffect(() => {
    const IsLogin = isLogin();
    console.log(!IsLogin);
    if (!IsLogin) {
      setIsShowLoginDialog(true);
    }
  }, []);

  const handleMovePrevious = () => {
    let curIndex = listMusics.findIndex(
      (item) => item._id === selectedSong._id
    );
    curIndex = curIndex === 0 ? listMusics.length - 1 : --curIndex;
    setSelectedSong(listMusics[curIndex]);
  };

  const getAllMusicsAPI = async () => {
    try {
      const result = await soundAPI.getListFavorite({});
      console.log(result);
      if (result.favorites) {
        setListMusics(result.favorites);
      }
    } catch (error) {
      console.log("login error:", error);
    }
  };

  const removeFromFavorite = async (soundID) => {
    try {
      const result = await soundAPI.removeFromFavorite({ soundId: soundID });
      localStorage.setItem("userInfo", JSON.stringify(result.userInfo));
      toast.success("Remove successfully!!");
    } catch (error) {
      toast.err("Err. Please try again!!");
    }
  };

  useEffect(() => {
    getAllMusicsAPI();
  }, []);

  useEffect(() => {
    setSelectedSong(listMusics[listMusics.length - 1]);
  }, [listMusics]);

  const checkActiveRow = (indexRow) => {
    return (
      indexRow ===
      listMusics.findIndex((item) => item?._id === selectedSong?._id)
    );
  };

  const handleRemoveFromFavorite = async () => {
    setIsShowConfirm(false);

    await removeFromFavorite(selectedItemToAddToFavorite._id);
    await getAllMusicsAPI();
  };

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      className: "sttRow",
      render: (text, record, index) => (
        <div className="flex items-center gap-3  justify-end">
          {selectedSong &&
            (checkActiveRow(index) ? (
              <img src="https://stc-id.nixcdn.com/v11/images/icon_status.gif" />
            ) : null)}

          <span className={checkActiveRow(index) && "text-[#FFC107]"}>
            {++index}
          </span>
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <div className={checkActiveRow(index) && "text-[#FFC107]"}>{text}</div>
      ),
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      render: (text, record, index) => (
        <div className={checkActiveRow(index) && "text-[#FFC107]"}>{text}</div>
      ),
    },
    {
      title: "Time",
      dataIndex: "duration",
      key: "duration",
      render: (text, record, index) => (
        <div className={checkActiveRow(index) && "text-[#FFC107]"}>
          {ConvertSecondToMinute(text)}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      className: "actionRow",

      render: (text, record, index) => (
        <div
          className={
            checkActiveRow(index)
              ? "text-[#FFC107] flex items-center gap-4"
              : "flex items-center gap-4"
          }
        >
          {selectedSong &&
            (checkActiveRow(index) && isPlay ? (
              <FaPause
                onClick={() => setIsPlay(false)}
                className="cursor-pointer"
              />
            ) : (
              <FaPlay />
            ))}

          <FaMinus
            className="cursor-pointer hover:scale-150"
            onClick={() => {
              setIsShowConfirm(true);
              setSelectedItemToAddToFavorite(record);
            }}
          />
        </div>
      ),
    },
  ];

  const handleRemoveSuccess = () => {
    setIsShowConfirm(false);
  };
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <h3 className="font-semibold text-white text-xl">LIST FAVORITE</h3>
        <Table columns={columns} dataSource={listMusics} pagination={false} />
      </div>
      <div className="col-span-1">
        <Playing
          song={selectedSong}
          onNext={handleMoveNext}
          onPrevious={handleMovePrevious}
          isPlay={isPlay}
          handlePlayPause={() => setIsPlay(!isPlay)}
        />
      </div>

      <Dialog
        isShow={isShowConfirm}
        type="delete"
        message={`Do you want to remove " ${selectedItemToAddToFavorite.name} " from your favorite list?`}
        onCancel={() => setIsShowConfirm(false)}
        onSuccess={handleRemoveFromFavorite}
      />
      <LoginDialog
        isShow={isShowLoginDialog}
        onCancel={() => setIsShowLoginDialog(false)}
        onSuccess={() => navigate("/login")}
      />
    </div>
  );
}
