import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { Table } from "antd";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Playing from "../../components/playing/Playing";

const cx = classNames.bind(styles);

export default function Home() {
  const [iconChange, setIconChange] = useState();
  const [listMusics, setListMusics] = useState([]);
  const [selectedSong, setSelectedSong] = useState();

  const handleMoveNext = () => {
    let curIndex = listMusics.findIndex(
      (item) => item._id === selectedSong._id
    );
    curIndex = curIndex === listMusics.length - 1 ? 0 : ++curIndex;
    setSelectedSong(listMusics[curIndex]);
  };

  const handleMovePrevious = () => {
    console.log("Previous");
    let curIndex = listMusics.findIndex(
      (item) => item._id === selectedSong._id
    );
    curIndex = curIndex === 0 ? listMusics.length - 1 : --curIndex;
    setSelectedSong(listMusics[curIndex]);
  };

  const getAllMusicsAPI = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/sound");

      if (result.data.sounds) {
        setListMusics(result.data.sounds);
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

  console.log(selectedSong);

  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
      className: "sttRow",
      render: (text, record, index) => (
        <div className="flex items-center gap-3  justify-end">
          {selectedSong &&
            (index ===
            listMusics.findIndex((item) => item?._id === selectedSong?._id) ? (
              <img src="https://stc-id.nixcdn.com/v11/images/icon_status.gif" />
            ) : null)}

          <span>{++index}</span>
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "Time",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      className: "actionRow",

      render: (text, record, index) => (
        <div className="flex items-center gap-2">
          <BsTrash
            className="cursor-pointer hover:scale-150"
            onClick={() => console.log()}
          />
          <BiEdit
            className="cursor-pointer hover:scale-150"
            onClick={() => console.log()}
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
        />
      </div>
    </div>
  );
}
