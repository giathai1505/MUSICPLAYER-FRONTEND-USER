import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./timer.module.scss";
import { Link } from "react-router-dom";

import { Modal } from "antd";
const cx = classNames.bind(styles);
export default function Timer({ isShow, onCancel, onOk }) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const Hours = [
    {
      time: "01",
    },
    {
      time: "02",
    },
    {
      time: "03",
    },
    {
      time: "04",
    },
    {
      time: "05",
    },
    {
      time: "06",
    },
    {
      time: "07",
    },
    {
      time: "08",
    },
    {
      time: "09",
    },
    {
      time: "10",
    },
    {
      time: "11",
    },
    {
      time: "12",
    },
  ];
  const Minute = [
    {
      time: "10",
    },
    {
      time: "20",
    },
    {
      time: "30",
    },
    {
      time: "40",
    },
    {
      time: "50",
    },
    {
      time: "60",
    },
  ];

  const handleClickAddHour = (e) => {
    const timeInput = document.querySelectorAll(`.${cx("time-input")}`);
    timeInput.forEach((el) => el.classList.remove(`${cx("focus")}`));
    const parent = e.target.parentNode.parentNode;
    parent.classList.add(`${cx("focus")}`);
    // console.log(timeInput);
  };
  const handleClickAddMinute = (e) => {
    const timeInput = document.querySelectorAll(`.${cx("time-input")}`);
    timeInput.forEach((el) => el.classList.remove(`${cx("focus")}`));
    const parent = e.target.parentNode.parentNode;
    parent.classList.add(`${cx("focus")}`);
  };
  const handleChooseHouse = (e) => {
    const val = e.target.innerHTML;
    setHour(val.split(" ")[0]);
    const parent = e.target.parentNode.parentNode;
    const btn = document.querySelector(`.${cx("action")}`);
    btn.classList.add(`${cx("active")}`);
    parent.classList.remove(`${cx("focus")}`);
  };
  const handleChooseMinute = (e) => {
    const val = e.target.innerHTML;
    setMinute(val.split(" ")[0]);
    const parent = e.target.parentNode.parentNode;
    const btn = document.querySelector(`.${cx("action")}`);
    btn.classList.add(`${cx("active")}`);
    parent.classList.remove(`${cx("focus")}`);
  };

  const handleClose = () => {
    setHour(0);
    setHour(0);
    onCancel();
  };

  const handleSubmit = (e) => {
    localStorage.setItem("hour", JSON.stringify(hour));
    localStorage.setItem("minute", JSON.stringify(minute));
    onOk({ hour, minute });
  };
  return (
    <Modal
      className="w-[800px]"
      open={isShow}
      onOk={onOk}
      style={{ height: "100px" }}
      onCancel={handleClose}
      footer={null}
      wrapClassName="h-[400px] bg-transparent  overflow-hidden"
    >
      <section className={cx("timer")}>
        <div className={cx("box")}>
          <div className={cx("time-picker")}>
            <div className={cx("time-input")}>
              <div className={cx("control")} onClick={handleClickAddHour}>
                <input type="text" value={hour || "00"} />
                <label htmlFor="">hour</label>
              </div>
              <div className={cx("time-option")}>
                {Hours.map((el, idx) => (
                  <div
                    key={idx}
                    className={cx("time-option-item")}
                    onClick={handleChooseHouse}
                  >
                    {el.time} hours
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("dot")}>:</div>
            <div className={cx("time-input")}>
              <div className={cx("control")} onClick={handleClickAddMinute}>
                <input type="text" value={minute || "00"} />
                <label htmlFor="" className="text-xs">
                  minutes
                </label>
              </div>
              <div className={cx("time-option")}>
                {Minute.map((el, idx) => (
                  <div
                    key={idx}
                    className={cx("time-option-item")}
                    onClick={handleChooseMinute}
                  >
                    {el.time} minutes
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h3 className={cx("desc")}>Choose the time to stop playing music</h3>
          <div className={cx("action")} onClick={handleSubmit}>
            Save
          </div>
        </div>
      </section>
    </Modal>
  );
}
