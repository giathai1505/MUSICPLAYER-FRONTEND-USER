import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { FaPause, FaPlay, FaPlus } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import Playing from "../../components/playing/Playing";
import { ConvertSecondToMinute } from "../../assets/function/string";
import ConfirmDialog from "../Home/ConfirmDialog";
import soundAPI from "../../api/soundAPI";

export default function Favorite() {
  const [listMusics, setListMusics] = useState([]);
  const [selectedSong, setSelectedSong] = useState();
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [selectedItemToAddToFavorite, setSelectedItemToAddToFavorite] =
    useState({});
  const [isPlay, setIsPlay] = useState(false);

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

  const handleAddToFavorite = (record) => {
    setIsShowConfirm(true);
    setSelectedItemToAddToFavorite(record);
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

          <FaPlus
            className="cursor-pointer hover:scale-150"
            onClick={() => handleAddToFavorite(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <h3 className="font-semibold text-white text-xl">LIST MUSIC</h3>
        <Table columns={columns} dataSource={listMusics} />
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
      <ConfirmDialog
        isShow={isShowConfirm}
        onCancel={() => setIsShowConfirm(false)}
        onSuccess={() => setIsShowConfirm(false)}
        item={selectedItemToAddToFavorite}
      />
    </div>
  );
}
