import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import axios from "axios";
import { FaPause, FaPlay } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart, AiOutlineSearch } from "react-icons/ai";

import Playing from "../../components/playing/Playing";
import { ConvertSecondToMinute } from "../../assets/function/string";
import ConfirmDialog from "./ConfirmDialog";
import soundAPI from "../../api/soundAPI";
import { toast } from "react-toastify";
import { BsPlusLg } from "react-icons/bs";

import Dialog from "../../components/ConfirmDialog";
import playlistAPI from "../../api/playlistAPI";
import AddMusicToPlaylist from "./AddToPlaylistDialog";
import InitialEmotion from "./InitialEmotionDialog";

export default function Music() {
  const [listMusics, setListMusics] = useState([]);
  const [selectedSong, setSelectedSong] = useState();
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [selectedItemToAddToFavorite, setSelectedItemToAddToFavorite] =
    useState({});
  const [isPlay, setIsPlay] = useState(false);
  const [listFavorite, setListFavorite] = useState([]);
  const [isShowAddToPlaylistDialog, setIsShowAddToPlaylistDialog] =
    useState(false);
  const [isShowInitialQuestion, setIsShowInitialQuestion] = useState(true);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [isAnswerQuestion, setIsAnswerQuestion] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const handleMoveNext = () => {
    let curIndex = listMusics.findIndex(
      (item) => item._id === selectedSong._id
    );
    curIndex = curIndex === listMusics.length - 1 ? 0 : ++curIndex;
    setSelectedSong(listMusics[curIndex]);
  };

  const handleMovePrevious = () => {
    let curIndex = listMusics.findIndex(
      (item) => item._id === selectedSong._id
    );
    curIndex = curIndex === 0 ? listMusics.length - 1 : --curIndex;
    setSelectedSong(listMusics[curIndex]);
  };

  const getAllMusicsAPI = async (text) => {
    try {
      const result = await soundAPI.getListMusic({
        emotionIds: selectedEmotions,
        name: text,
      });
      if (result.musics) {
        setListMusics(result.musics);
      }
    } catch (error) {
      console.log("login error:", error);
    }
  };

  const getListFavoriteFromLocalStorage = () => {
    let userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {};

    setListFavorite(userInfo?.favorites || []);
  };

  useEffect(() => {
    let isAnswer = localStorage.getItem("isAnswerQuestion")
      ? JSON.parse(localStorage.getItem("isAnswerQuestion"))
      : false;

    setIsAnswerQuestion(isAnswer);
  }, []);

  useEffect(() => {
    getAllMusicsAPI(searchInput);
    getListFavoriteFromLocalStorage();
  }, [selectedEmotions]);

  useEffect(() => {
    setSelectedSong(listMusics[0]);
  }, [listMusics]);

  const checkActiveRow = (indexRow) => {
    return (
      indexRow ===
      listMusics.findIndex((item) => item?._id === selectedSong?._id)
    );
  };

  const handleAddToFavorite = (record) => {
    setIsShowConfirm(true);
    setSelectedItemToAddToFavorite(record);
  };

  const handleRemoveFromFavorite = async (record) => {
    try {
      const result = await soundAPI.removeFromFavorite({ soundId: record._id });
      localStorage.setItem("userInfo", JSON.stringify(result.userInfo));
      getListFavoriteFromLocalStorage();
      toast.success("Remove successfully !");
    } catch (error) {
      console.log(error);
      toast.error("Err. Please try again!");
    }
  };

  const handleAddToPlaylistOk = async (record) => {
    try {
      const result = await playlistAPI.removeFromFavorite({
        soundId: record._id,
      });
      localStorage.setItem("userInfo", JSON.stringify(result.userInfo));
      getListFavoriteFromLocalStorage();
      toast.success("Remove successfully !");
    } catch (error) {
      console.log(error);
      toast.error("Err. Please try again!");
    }
  };

  const handleRowClick = (record) => {
    setSelectedSong(listMusics.find((item) => item._id === record._id));
  };

  const handleDialogSuccess = () => {
    setIsShowConfirm(false);
    getListFavoriteFromLocalStorage();
  };

  const handleRandom = () => {};

  const handleAddToPlaylist = (record) => {
    setIsShowAddToPlaylistDialog(true);
    setSelectedItemToAddToFavorite(record);
  };

  const handleChoseAnswerSuccess = (emotions) => {
    //call api get list music
    localStorage.setItem("isAnswerQuestion", JSON.stringify(false));
    setIsShowInitialQuestion(false);
    setSelectedEmotions(emotions);
  };

  const handleChangeSearchInput = async (e) => {
    setSearchInput(e.target.value);
    await getAllMusicsAPI(e.target.value);
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
        <div
          className={
            checkActiveRow(index)
              ? "text-[#FFC107] flex items-center gap-3"
              : "flex items-center gap-3"
          }
        >
          <img
            src={record.image}
            alt=""
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <p className="font-medium">{record.name}</p>
            <p className="text-[hsla(0,0%,100%,0.5)] text-xs">
              {record.artist}
            </p>
          </div>
        </div>
      ),
    },
    // {
    //   title: "Artist",
    //   dataIndex: "artist",
    //   key: "artist",
    //   render: (text, record, index) => (
    //     <div className={checkActiveRow(index) && "text-[#FFC107]"}>{text}</div>
    //   ),
    // },
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

          {listFavorite.find((item) => item === record._id) !== undefined ? (
            <AiFillHeart
              className="cursor-pointer hover:scale-150"
              onClick={() => handleRemoveFromFavorite(record)}
            />
          ) : (
            <AiOutlineHeart
              className="cursor-pointer hover:scale-150"
              onClick={() => handleAddToFavorite(record)}
            />
          )}
          <BsPlusLg
            className="cursor-pointer hover:scale-150"
            onClick={() => handleAddToPlaylist(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <h3 className="font-semibold text-white text-xl mb-2">LIST MUSIC</h3>

        <div className="flex  items-center w-[500px] bg-white pl-2 py-1 rounded-lg my-3">
          <AiOutlineSearch className="text-[30px]" />
          <input
            type="text"
            value={searchInput}
            placeholder="Seach ..."
            className="bg-transparent border-0 outline-none text-lg"
            onChange={handleChangeSearchInput}
          />
        </div>

        <Table
          pagination={false}
          columns={columns}
          dataSource={listMusics}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => handleRowClick(record), // click row
            };
          }}
        />
      </div>
      {listMusics.length >= 0 ? (
        <div className="col-span-1">
          <Playing
            song={selectedSong}
            onNext={handleMoveNext}
            onPrevious={handleMovePrevious}
            isPlay={isPlay}
            handlePlayPause={() => setIsPlay((pre) => !pre)}
            onRandom={handleRandom}
          />{" "}
        </div>
      ) : null}

      <ConfirmDialog
        isShow={isShowConfirm}
        onCancel={() => setIsShowConfirm(false)}
        onSuccess={handleDialogSuccess}
        item={selectedItemToAddToFavorite}
      />

      <AddMusicToPlaylist
        isShow={isShowAddToPlaylistDialog}
        onCancel={() => setIsShowAddToPlaylistDialog(false)}
        onSuccess={handleRemoveFromFavorite}
        item={selectedItemToAddToFavorite}
      />
      {isAnswerQuestion ? (
        <InitialEmotion
          isShow={isShowInitialQuestion}
          onCancel={() => setIsShowInitialQuestion(false)}
          onOk={handleChoseAnswerSuccess}
        />
      ) : null}
    </div>
  );
}
