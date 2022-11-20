import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./playing.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faCirclePlay,
  faForwardStep,
  faPauseCircle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

export default function Playing({ song, onNext, onPrevious }) {
  const [iconChange, setIconChange] = useState(faCirclePlay);
  const [timePercent, setTimePercent] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const [duration, setDuration] = useState("");
  const [curTime, setCurTime] = useState("");

  useEffect(() => {
    onReset(song?.file);
  }, [song]);

  const handlePlaying = () => {
    if (iconChange === faCirclePlay) {
      setIconChange(faPauseCircle);
      audioRef.current.play();
    }
    if (iconChange === faPauseCircle) {
      setIconChange(faCirclePlay);
      audioRef.current.pause();
    }
  };

  const handleUpdateProgressBar = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;

    const timePercent = Math.floor((currentTime / duration) * 100);
    setTimePercent(timePercent);
    renderCurTime();
  };

  const handleEndAudio = () => {
    onNext();
  };

  const handleClickProgressBar = (e) => {
    const width = progressBarRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    audioRef.current.currentTime = (offset / width) * audioRef.current.duration;
    setTimePercent(Math.floor(offset / width) * 100);
  };

  const onReset = (src) => {
    if (audioRef.current) {
      audioRef.current.src = src;

      progressBarRef.current.value = 0;
      setTimePercent(0);
      setIconChange(faCirclePlay);
      handlePlaying();
      renderTime();
    }
  };

  const renderTime = () => {
    const minutes = Math.floor(Math.floor(song.duration) / 60);
    const second = Math.floor(song.duration) % 60;
    setDuration(minutes + ":" + second);
  };

  const renderCurTime = () => {
    const minutes = Math.floor(Math.floor(audioRef.current.currentTime) / 60);
    const second = Math.floor(audioRef.current.currentTime) % 60;
    const formatSecond = ("0" + second).slice(0, 2);
    setCurTime(minutes + ":" + formatSecond);
  };
  return (
    <div className={cx("playing-song")}>
      {song ? (
        <>
          <audio
            controls="controls"
            ref={audioRef}
            className="hidden"
            onTimeUpdate={handleUpdateProgressBar}
            onEnded={handleEndAudio}
          >
            <source src={song.file} type="audio/mpeg" />
          </audio>

          <div className={cx("player-box")}>
            <div className={cx("player-media")}>
              <img src={song.image} alt="" className={cx("player-image")} />
            </div>
            <h3 className={cx("song-title")}>{song.name}</h3>
            <h3 className={cx("song-desc")}>{song.artist}</h3>
            <p className={cx("song-lyric")}>No, lyric</p>
            <div className={cx("progress")}>
              <input
                type="range"
                id="progress-bar"
                min="0"
                max="100"
                ref={progressBarRef}
                value={timePercent || 0}
                className={cx("bar")}
                onClick={(e) => handleClickProgressBar(e)}
              />
            </div>
            <div className={cx("player-number")}>
              <span className="text-white">{curTime ? curTime : "0:00"}</span>
              <td className="flex text-white gap-3">
                <button class={cx("repeat", "btn-action")}>
                  <FontAwesomeIcon
                    icon={faRepeat}
                    className={cx("icon")}
                  ></FontAwesomeIcon>
                </button>

                <button class={cx("back", "btn-action")}>
                  <FontAwesomeIcon
                    icon={faBackwardStep}
                    className={cx("icon")}
                    onClick={onPrevious}
                  ></FontAwesomeIcon>
                </button>
                <button class={cx("play-song", "btn-action")}>
                  <FontAwesomeIcon
                    icon={iconChange}
                    className={cx("icon")}
                    onClick={handlePlaying}
                  ></FontAwesomeIcon>
                </button>
                <button class={cx("forward", "btn-action")}>
                  <FontAwesomeIcon
                    icon={faForwardStep}
                    className={cx("icon")}
                    onClick={onNext}
                  ></FontAwesomeIcon>
                </button>
              </td>
              <span className="text-white">{duration ? duration : "0:00"}</span>
            </div>
          </div>

          <div className={cx("player-tool")}></div>
        </>
      ) : (
        "loading"
      )}
    </div>
  );
}
