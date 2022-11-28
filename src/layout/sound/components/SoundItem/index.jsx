import React, { useEffect, useRef, useState } from "react";

import { FaPlay, FaPause } from "react-icons/fa";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";

const SoundItem = ({ sound }) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (isPlay) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlay]);

  const handleChangeVolume = (e) => {
    audioRef.current.volume = e.target.value;
    setVolume(e.target.value);
  };

  return (
    <div className="col-span-1">
      {sound ? (
        <audio
          controls="controls"
          onEnded={() => setIsPlay(false)}
          ref={audioRef}
          className="hidden"
        >
          <source src={sound.file} type="audio/mpeg" />
        </audio>
      ) : null}
      <div
        className="relative rounded-lg overflow-hidden  cursor-pointer"
        onMouseMove={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => setIsPlay(!isPlay)}
      >
        <img
          src={sound.image}
          alt=""
          className="w-full h-[200px] object-cover"
        />

        {isHover ? (
          <>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)]"></div>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white">
              {isPlay ? (
                <FaPause className="text-[30px]" />
              ) : (
                <FaPlay className="text-[30px]" />
              )}
            </div>
          </>
        ) : null}
      </div>

      <div
        className={isPlay ? "visible flex justify-center mt-3" : "invisible"}
      >
        {volume > 0 ? (
          <GiSpeaker className="text-white text-[24px]" />
        ) : (
          <GiSpeakerOff className="text-white text-[24px]" />
        )}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          id="rangeVolume"
          className="bg-primary"
          onChange={handleChangeVolume}
        />
      </div>
    </div>
  );
};

export default SoundItem;
