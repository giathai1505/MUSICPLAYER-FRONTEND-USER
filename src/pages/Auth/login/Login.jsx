import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './login.module.scss';
import { Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { Input } from '../../../assets/styles';

import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import authAPI from '../../../api/authAPI';

const cx = classNames.bind(styles);

const clientId =
  '802827576027-s1apjbcnuqsefsnu1jpn6ihng1oevta4.apps.googleusercontent.com';

let initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email().required('Enter your email'),
  password: Yup.string().required('Enter your password'),
});

export default function Login() {
  const navigate = useNavigate();

  const cleanLocalStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
  };

  const loginGoogle = async (response) => {
    try {
      cleanLocalStorage();
      const result = await authAPI.loginWithGoogle({
        tokenId: response.tokenId,
      });

      if (result.success) {
        localStorage.setItem('isAnswerQuestion', JSON.stringify(true));
        localStorage.setItem('userInfo', JSON.stringify(result.userInfo || {}));
        localStorage.setItem('accessToken', JSON.stringify(result.accessToken));
        toast.success('Login Successfully!');
        navigate('/music');
      }
      toast.error('Login failed!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const handleSubmit = async (values) => {
    try {
      cleanLocalStorage();
      const result = await authAPI.login(values);

      if (result.success) {
        localStorage.setItem('isAnswerQuestion', JSON.stringify(true));
        localStorage.setItem('userInfo', JSON.stringify(result.userInfo || {}));
        localStorage.setItem('accessToken', JSON.stringify(result.accessToken));

        toast.success('Login Successfully!');
        navigate('/music');
      }

      toast.error(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={cx('login')}>
        <div className={cx('main')}>
          <div className='flex items-center flex-col'>
            <div className='flex items-center flex-col'>
              <div className={cx('logo')}>
                <img
                  src={require('./../../../assets/images/Logo-Offical-gadient.png')}
                  alt='logo'
                />
              </div>
              <h3 className='text-md mb-2 text-white'>Melody For Emotion</h3>
              <p className='text-[30px] font-normal text-white font-header mb-2'>
                LOGIN
              </p>
            </div>
            <div className='w-[400px]'>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className='flex flex-col gap-3'>
                      <Input
                        name='email'
                        placeholder='example@gmail.com'
                        className='bg-transparent'
                      />
                      {errors.email && touched.email ? (
                        <div className='text-[#f23030]'>{errors.email}</div>
                      ) : null}

                      <Input
                        name='password'
                        placeholder='*******'
                        className='bg-transparent rounded-full outline-none text-white border-white px-3 py-2  border border-solid'
                        type='password'
                      />

                      {errors.password && touched.password ? (
                        <div className='text-[#f23030]'>{errors.password}</div>
                      ) : null}
                      <button
                        type='submit'
                        className='px-[50px] py-[10px] rounded-full bg-primary text-white'
                      >
                        Submit
                      </button>
                      <div className='flex justify-end mt-1'>
                        <Link
                          to='/forgotPassword'
                          className='text-lg text-primary'
                          type='submit'
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className='text-lg flex mt-3 flex-col justify-center items-center gap-3 text-white'>
              <GoogleLogin
                clientId={clientId}
                buttonText='Sign in with Google'
                onSuccess={loginGoogle}
                onFailure={loginGoogle}
                cookiePolicy={'single_host_origin'}
              />

              <p className=''>
                Don't have an account yet?
                <NavLink to='/register' className='text-primary'>
                  &nbsp;Register for free
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
