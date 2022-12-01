import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../../../assets/styles";

import GoogleLogin from "react-google-login";
import authAPI from "../../../api/authAPI";

const cx = classNames.bind(styles);

let initialValues = {
  email: "thai@gmail.com",
  password: "111",
};

const validationSchema = Yup.object({
  email: Yup.string().email().required("Enter your email"),
  password: Yup.string().required("Enter your password"),
});

export default function Login() {
  const navigate = useNavigate();

  const loginGoogle = (response) => {
    console.log(response);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const result = await authAPI.login(values);

      localStorage.setItem("userInfo", JSON.stringify(result.userInfo || {}));
      localStorage.setItem("accessToken", JSON.stringify(result.accessToken));
      toast.success("Login Successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={cx("login")}>
        <div className={cx("main")}>
          <div className="flex items-center flex-col">
            <div className="flex items-center flex-col">
              <div className={cx("logo")}>
                <img
                  src={require("./../../../assets/images/Logo-Offical-gadient.png")}
                  alt="logo"
                />
              </div>
              <h3 className="text-md mb-2 text-white">Melody For Emotion</h3>
              <p className="text-[30px] font-normal text-white font-header mb-2">
                LOGIN
              </p>
            </div>
            <div className="w-[400px]">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="flex flex-col gap-3">
                      <Input
                        name="email"
                        placeholder="jane@acme.com"
                        className="bg-transparent"
                      />
                      {errors.email && touched.email ? (
                        <div className="text-[#f23030]">{errors.email}</div>
                      ) : null}

                      <Input
                        name="password"
                        placeholder="*******"
                        className="bg-transparent rounded-full outline-none text-white border-white px-3 py-2  border border-solid"
                        type="password"
                      />

                      {errors.password && touched.password ? (
                        <div className="text-[#f23030]">{errors.password}</div>
                      ) : null}
                      <button
                        type="submit"
                        className="px-[50px] py-[10px] rounded-full bg-primary text-white"
                      >
                        Submit
                      </button>
                      <div className="flex justify-end mt-1">
                        <Link
                          to="/forgotPassword"
                          className="text-lg text-primary"
                          type="submit"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="text-lg flex mt-3 flex-col justify-center items-center gap-3 text-white">
              {/* <p>Or continue with</p>
              <button>
                <img
                  src={require('./../../assets/images/flat-color-icons_google.png')}
                  alt=''
                />
              </button> */}

              <GoogleLogin
                clientId="802827576027-f4v2l58cjucfsplf4lf4k39mikl61qi0.apps.googleusercontent.com"
                buttonText="Login with google"
                onSuccess={loginGoogle}
                onFailure={loginGoogle}
                cookiePolicy={"single_host_origin"}
              />

              <p className="">
                Don't have an account yet?
                <NavLink to="/register" className="text-primary">
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
