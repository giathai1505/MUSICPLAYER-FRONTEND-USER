import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./ChangePassword.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

export default function ChangePassword() {
  const [formData, setFormData] = useState({});
  const [username, setUsername] = useState(false);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  console.log(token);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: Yup.object({
        password: Yup.string()
          .required("Please enter your password")
          .min(8, "Password must be greater than 8 characters"),
        confirmPassword: Yup.string()
          .required("Please enter your confirm password!")
          .oneOf([Yup.ref("password"), null], "password must match"),
      }),
      onSubmit: async (value) => {
        try {
          const result = axios.post(
            "http://localhost:5000/api/user/reset-password",
            {
              password: value.password,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          toast.success("Change password successfully!");
          navigate("/login");
        } catch (error) {
          toast.success("Err. Please try again!");
        }
      },
    });

  return (
    <>
      <div className={cx("login")}>
        <div className={cx("main")}>
          {/* New password */}
          <form className={cx("newPassword-form")} onSubmit={handleSubmit}>
            <div className={cx("logo")}>
              <img
                src={require("../../../assets/images/Logo-Offical-gadient.png")}
                alt="logo"
              />
            </div>
            <h3 className="text-md mb-2 text-white">Melody For Emotion</h3>
            <p className={cx("text")}>Forgot Password</p>
            <div className={cx("form")}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="new password"
                className={cx(
                  `${
                    errors.password && touched.password
                      ? "input-errors"
                      : "form-input"
                  }`
                )}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <div className={cx("errorMsg")}>{errors.password}</div>
              ) : null}
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confirm new password"
                className={cx(
                  `${
                    errors.confirmPassword && touched.confirmPassword
                      ? "input-errors"
                      : "form-input"
                  }`
                )}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className={cx("errorMsg")}>{errors.confirmPassword}</div>
              ) : null}

              <div className={cx("action")}>
                <button className={cx("btn_change-Password")}>
                  Change Password
                </button>
              </div>
            </div>
            <div className={cx("social")}>
              <p className={cx("question")}>
                or back to <Link to="/login">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
