import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
export default function Header() {
  const [isLogin, setIsLogin] = useState();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {};
    setUserInfo(userInfo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    toast.success("Logout successfully!");
    navigate("/login");
  };

  return (
    <>
      <header className={cx("header")}>
        <div className={cx("header-app-list")}>
          <Link className={cx("timer")} to="/timer">
            <img
              src={require("./../../assets/images/icons8-clock 1.png")}
              alt=""
              className="w-[50px]"
            />
          </Link>
          {isLogin ? (
            <div className={cx("authen")}>
              <Link to="/login" className={cx("btn-login")}>
                Login
              </Link>
            </div>
          ) : (
            <div className={cx("authen")}>
              <div className={cx("user")}>
                <div className={cx("avatar")}>
                  <img src={userInfo.avatar} alt="" className={cx("lock")} />
                </div>
                <p className={cx("name")}>{userInfo.username}</p>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
