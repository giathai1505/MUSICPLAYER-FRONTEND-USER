import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './playing.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardStep,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons';
import { FaPause, FaPlay } from 'react-icons/fa';
import { CgRepeat } from 'react-icons/cg';
import { GiSpeakerOff, GiSpeaker } from 'react-icons/gi';

import { ConvertSecondToMinute } from '../../assets/function/string';
import { ee } from '../header/Header';

const cx = classNames.bind(styles);

export default function Playing({
  song,
  onNext,
  onPrevious,
  isPlay,
  handlePlayPause,
}) {
  const [timePercent, setTimePercent] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const [duration, setDuration] = useState('');
  const [curTime, setCurTime] = useState('');
  const [isRepeat, setIsRepeat] = useState(true);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    onReset(song?.file);
    try {
      audioRef.current && isPlay
        ? audioRef.current.play()
        : audioRef.current.pause();
    } catch (error) {
      console.log(error);
    }
    setVolume(1);
  }, [song]);

  const handlePlaying = () => {
    if (isPlay === false) {
      audioRef.current.play();
    }
    if (isPlay === true) {
      audioRef.current.pause();
    }
    handlePlayPause();
  };

  ee.on('message', function (text) {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  });

  const handleUpdateProgressBar = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;

    const timePercent = Math.floor((currentTime / duration) * 100);
    setTimePercent(timePercent);
    renderCurTime();
  };

  const handleEndAudio = () => {
    if (isRepeat) {
      //handle repeat
      audioRef.current.load();
      audioRef.current.play();
    } else {
      onNext();
    }
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
      audioRef.current.volume = 1;

      progressBarRef.current.value = 0;
      setTimePercent(0);
      renderTime();
    }
  };

  const renderTime = () => {
    const minutes = Math.floor(Math.floor(song.duration) / 60);
    const second = Math.floor(song.duration) % 60;
    setDuration(minutes + ':' + second);
  };

  const renderCurTime = () => {
    setCurTime(ConvertSecondToMinute(audioRef.current.currentTime));
  };

  const handleChangeVolume = (e) => {
    audioRef.current.volume = e.target.value;
    setVolume(e.target.value);
  };

  return (
    <div className={cx('playing-song')}>
      {song ? (
        <>
          <audio
            controls='controls'
            ref={audioRef}
            className='hidden'
            onTimeUpdate={handleUpdateProgressBar}
            onEnded={handleEndAudio}
          >
            <source src={song.file} type='audio/mpeg' />
          </audio>

          <div className={cx('player-box')}>
            <div className={cx('player-media', { rotate: isPlay })}>
              <img src={song.image} alt='' className={cx('player-image')} />

              <div className='absolute flex justify-center items-center hover:cursor-pointer w-8 h-8 rounded-full border border-solid border-white left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                {isPlay ? (
                  <img
                    src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                    alt=''
                    className='w-4 h-4 '
                  />
                ) : (
                  <FaPlay className='text-white' />
                )}
              </div>
            </div>
            <div className='-rotate-90 absolute top-[80px] right-[-30px] flex'>
              {volume > 0 ? (
                <GiSpeaker className='text-white text-[24px] rotate-90' />
              ) : (
                <GiSpeakerOff className='text-white text-[24px] rotate-90' />
              )}
              <input
                type='range'
                min='0'
                max='1'
                step='0.1'
                value={volume}
                id='rangeVolume'
                className='bg-primary'
                onChange={handleChangeVolume}
              />
            </div>
            <div className='flex flex-col items-center text-white'>
              <p className='font-bold text-[16px]'>{song.name}</p>
              <p>{song.artist}</p>
              <p>No, lyric</p>
            </div>

            <div className={cx('progress')}>
              <input
                type='range'
                id='progress-bar'
                min='0'
                max='100'
                ref={progressBarRef}
                value={timePercent || 0}
                className={cx('bar')}
                onClick={(e) => handleClickProgressBar(e)}
              />
            </div>
            <div className={cx('player-number')}>
              <span className='text-white'>{curTime ? curTime : '0:00'}</span>
              <td className='flex text-white gap-3 items-center'>
                <CgRepeat
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={
                    isRepeat
                      ? 'text-[30px] text-yellow cursor-pointer'
                      : 'text-[30px] cursor-pointer'
                  }
                />

                <button class={cx('back', 'btn-action')}>
                  <FontAwesomeIcon
                    icon={faBackwardStep}
                    className={cx('icon')}
                    onClick={onPrevious}
                  ></FontAwesomeIcon>
                </button>
                <div
                  className='cursor-pointer text-[18px]'
                  onClick={handlePlaying}
                >
                  {isPlay ? <FaPause /> : <FaPlay />}
                </div>

                <button class={cx('forward', 'btn-action')}>
                  <FontAwesomeIcon
                    icon={faForwardStep}
                    className={cx('icon')}
                    onClick={onNext}
                  ></FontAwesomeIcon>
                </button>
              </td>
              <span className='text-white'>{duration ? duration : '0:00'}</span>
            </div>
          </div>

          <div className={cx('player-tool')}></div>
        </>
      ) : null}
    </div>
  );
}
