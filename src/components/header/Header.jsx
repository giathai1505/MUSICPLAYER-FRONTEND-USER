import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Timer from './CountdownDialog';

var EventEmitter = require('events');

export var ee = new EventEmitter();

const cx = classNames.bind(styles);
export default function Header() {
  const [isLogin, setIsLogin] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isShowTimer, setIsShowTimer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : {};
    setUserInfo(userInfo);

    let hourlc = localStorage.getItem('hour')
      ? JSON.parse(localStorage.getItem('hour'))
      : null;

    let minutelc = localStorage.getItem('minute')
      ? JSON.parse(localStorage.getItem('minute'))
      : null;
    setHour(Number(hourlc));
    setMinute(Number(minutelc));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    toast.success('Logout successfully!');
    navigate('/login');
  };
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (minute > 0) {
        localStorage.setItem('minute', JSON.stringify(minute - 1));
        setMinute(minute - 1);
      }
      if (minute === 0) {
        if (hour === 0) {
          setHour(0);
          setMinute(0);
          clearInterval(myInterval);
          ee.emit('message', false);
        } else {
          localStorage.setItem('hour', JSON.stringify(hour - 1));
          localStorage.setItem('minute', JSON.stringify(59));
          setHour(hour - 1);
          setMinute(59);
        }
      }
    }, 60000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleSetTimeOk = (values) => {
    setIsShowTimer(false);
    setHour(values.hour || 0);
    setMinute(values.minute || 0);
  };

  return (
    <>
      <header className={cx('header')}>
        <div className={cx('header-app-list')}>
          <div className='text-white font-header text-[24px] mr-3'>
            {`${hour}:${minute}`}
          </div>

          <div className={cx('timer')} onClick={() => setIsShowTimer(true)}>
            <img
              src={require('./../../assets/images/icons8-clock 1.png')}
              alt=''
              className='w-[50px]'
            />
          </div>
          {userInfo.username ? (
            <div className={cx('authen')}>
              <div className={cx('user')}>
                <div className={cx('avatar')}>
                  <img src={userInfo.avatar} alt='' className={cx('lock')} />
                </div>
                <p className={cx('name')}>{userInfo.username}</p>
              </div>
            </div>
          ) : (
            <div className={cx('authen')}>
              <Link to='/login' className={cx('btn-login')}>
                Login
              </Link>
            </div>
          )}
        </div>
      </header>
      <Timer
        isShow={isShowTimer}
        onCancel={() => setIsShowTimer(false)}
        onOk={handleSetTimeOk}
      />
    </>
  );
}
