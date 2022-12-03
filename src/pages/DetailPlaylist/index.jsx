import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { FaMinus, FaPause, FaPlay, FaPlus } from "react-icons/fa";
import Playing from "../../components/playing/Playing";
import { ConvertSecondToMinute } from "../../assets/function/string";
import soundAPI from "../../api/soundAPI";
import Dialog from "../../components/ConfirmDialog";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import playlistAPI from "../../api/playlistAPI";

export default function DetailPlaylist() {
  let { id } = useParams();
  const [listMusics, setListMusics] = useState([]);
  const [selectedSong, setSelectedSong] = useState();
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [selectedItemToAddToFavorite, setSelectedItemToAddToFavorite] =
    useState({});

  const [detailPlaylist, setDetailPlaylist] = useState({});
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

  const getDetailPlaylist = async () => {
    try {
      const result = await playlistAPI.getDetailPlaylist({ playlistId: id });
      console.log(result);

      setListMusics(result?.playlist?.songs || []);
      setDetailPlaylist(result?.playlist || {});
    } catch (error) {
      console.log("login error:", error);
    }
  };
  console.log(listMusics);

  const removeFromFavorite = async (soundID) => {
    try {
      const result = await playlistAPI.deleteMusicFromPlaylist({
        soundId: selectedItemToAddToFavorite._id,
        playlistId: detailPlaylist._id,
      });
      toast.success("Remove successfully!!");
    } catch (error) {
      toast.err("Err. Please try again!!");
    }
  };

  useEffect(() => {
    getDetailPlaylist();
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

  const handleRemoveFromPlaylist = async () => {
    setIsShowConfirm(false);

    await removeFromFavorite(selectedItemToAddToFavorite._id);
    await getDetailPlaylist();
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
        <h3 className="font-semibold text-white text-xl">
          {detailPlaylist?.name}
        </h3>
        <p className="text-white mt-2">{detailPlaylist?.description}</p>
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
        message={`Do you want to remove " ${selectedItemToAddToFavorite.name} " from your "${detailPlaylist.name}" playlist?`}
        onCancel={() => setIsShowConfirm(false)}
        onSuccess={handleRemoveFromPlaylist}
      />
    </div>
  );
}
