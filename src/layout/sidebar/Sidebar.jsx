import React from "react";
import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLeaf, faMusic } from "@fortawesome/free-solid-svg-icons";
import { BiLogOutCircle } from "react-icons/bi";

import { FaRegUser } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";

const cx = classNames.bind(styles);
export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("isAnswerQuestion");

    navigate("/login");
  };
  return (
    <section className={cx("sidebar")}>
      <div className={cx("logo")}>
        <img
          src={require("./../../assets/images/Logo-Offical-gadient.png")}
          alt="logo"
        ></img>
        <p>Melody for emotion</p>
      </div>
      <div className={cx("inner")}>
        <ul className={cx("list")}>
          <li className={cx("item")}>
            <Link className={cx("link")} to="/">
              <FontAwesomeIcon
                icon={faMusic}
                className={cx("icon")}
              ></FontAwesomeIcon>
              <p className={cx("text")}>Music</p>
            </Link>
          </li>
          <li className={cx("item")}>
            <Link className={cx("link")} to="/Sound">
              <FontAwesomeIcon
                icon={faLeaf}
                className={cx("icon")}
              ></FontAwesomeIcon>
              <p className={cx("text")}>Sound</p>
            </Link>
          </li>
          <li className={cx("item")}>
            <Link className={cx("link")} to="/favorite">
              <FontAwesomeIcon
                icon={faHeart}
                className={cx("icon")}
              ></FontAwesomeIcon>
              <p>Favorite</p>
            </Link>
          </li>
          <li className={cx("item")}>
            <Link className={cx("link")} to="/playlist">
              <RiPlayList2Fill />
              <p>Playlist</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-white flex flex-col gap-3 ml-5 absolute bottom-10 text-sm">
        <Link to="/profile" className="flex items-center gap-2">
          <FaRegUser />
          <span>Profile</span>
        </Link>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLogout}
        >
          <BiLogOutCircle />
          <span>Log out</span>
        </div>
      </div>
    </section>
  );
}
