import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import authAPI from "../../../api/authAPI";

const cx = classNames.bind(styles);

let initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Enter your username"),
  email: Yup.string().email().required("Enter your email"),
  password: Yup.string().required("Enter your password"),
  confirmPassword: Yup.string().required("Enter your password"),
  // .matches(
  //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  //   "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  // ),
});

export default function Register() {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const result = await authAPI.register(values);

      if (result.success) {
        localStorage.setItem("accessToken", JSON.stringify(result.accessToken));
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={cx("login")}>
        <div className={cx("main")}>
          <div className="p-5 flex items-center flex-col">
            <div className="flex items-center flex-col">
              <div className={cx("logo")}>
                <img
                  src={require("./../../../assets/images/Logo-Offical-gadient.png")}
                  alt="logo"
                />
              </div>
              <h3 className="text-md mb-4 text-white">Melody For Emotion</h3>
              <p className="text-[30px] font-normal text-white font-header mb-4">
                Register
              </p>
            </div>
            <div className="w-[400px]">
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="flex flex-col gap-1">
                      <Field
                        className="rounded-full px-3 py-2 bg-transparent border border-solid border-white text-white"
                        name="username"
                        placeholder="username"
                      />
                      {errors.username && touched.username ? (
                        <div className="text-[#f23030]">{errors.username}</div>
                      ) : null}
                      <Field
                        className="rounded-full px-3 py-2 bg-transparent border border-solid border-white text-white"
                        name="email"
                        placeholder="example@gmail.com"
                      />
                      {errors.email && touched.email ? (
                        <div className="text-[#f23030]">{errors.email}</div>
                      ) : null}
                      <Field
                        className="rounded-full px-3 py-2 bg-transparent border border-solid border-white text-white"
                        name="password"
                        placeholder="*******"
                      />
                      {errors.password && touched.password ? (
                        <div className="text-[#f23030]">{errors.password}</div>
                      ) : null}
                      <Field
                        className="rounded-full px-3 py-2 bg-transparent border border-solid border-white text-white"
                        name="confirmPassword"
                        placeholder="*******"
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="text-[#f23030]">
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                      <button
                        type="submit"
                        className="px-[30px] py-[10px] rounded-full bg-primary text-white"
                      >
                        Register
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="text-md flex mt-2 flex-col justify-center items-center gap-3 text-white">
              <p>Or continue with</p>
              <button>
                <img
                  src={require("./../../../assets/images/flat-color-icons_google.png")}
                  alt=""
                />
              </button>
              <p className="">
                Don't have an account yet?
                <NavLink to="/login" className="text-primary">
                  &nbsp;Login to your account
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
