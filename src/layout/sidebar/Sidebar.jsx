import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { listMenu } from "./data";

const cx = classNames.bind(styles);
export default function Sidebar() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  let location = window.location.href;

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {};
    setUserInfo(userInfo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <section className={cx("sidebar")}>
      <div className="flex flex-col gap-2 justify-center items-center mt-5">
        <img
          src={require("./../../assets/images/Logo-Offical-gadient.png")}
          alt="logo"
          className="w-[100px]"
        ></img>
        <p className="text-white text-[16px]">Melody for emotion</p>
      </div>
      <div className={cx("inner")}>
        <div className="flex flex-col text-white">
          {listMenu.map((item) => {
            return (
              <Link
                to={item.path}
                className={`flex gap-3 text-[18px] items-center font-header hover:text-primary pl-10 py-3 ${
                  location.includes(item.path) ? "bg-primary" : ""
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
      {userInfo.username ? (
        <div className="text-white flex flex-col gap-3 ml-10 absolute bottom-10 text-lg font-header">
          <Link to="/profile" className="flex items-center gap-3">
            <FaRegUser />
            <span>Profile</span>
          </Link>

          <div
            className="flex items-center gap-3 cursor-pointer hover:text-primary"
            onClick={handleLogout}
          >
            <BiLogOutCircle />
            <span>Log out</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
