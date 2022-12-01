import { Modal } from "antd";
import { Form, Formik } from "formik";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as Yup from "yup";

import { GiSoundOn } from "react-icons/gi";
import { AiFillProfile, AiOutlineFileImage } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

import useImageUpload from "../../../hooks/useUpLoadFile.js";
import FormikControl from "../../../components/formikCustom/FormikControl.js";
import profileAPI from "../../../api/profile.js";
import { BiImageAdd } from "react-icons/bi";

const radioOptions = [
  { key: "Male", value: "MALE" },
  { key: "Female", value: "FEMALE" },
];

const marriageOptions = [
  { key: "Single", value: "SINGLE" },
  { key: "In love", value: "IN_LOVE" },
];

const validationSchema = Yup.object({
  fullName: Yup.string().required("Enter your full name"),
  username: Yup.string().required("Enter your user name"),
  gender: Yup.string().required("Enter your gender"),
  dateOfBirth: Yup.string().required("Enter your date of birth"),
  maritalStatus: Yup.string().required("Enter your marital status"),
});

const EditProfile = ({ isShow, onOk, onCancel, user }) => {
  const imageUpload = useImageUpload();
  const [avatar, setAvatar] = useState("");
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    username: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    maritalStatus: "",
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        dateOfBirth: moment(user?.dateOfBirth).format("DD/MM/YYYY"),
        maritalStatus: user.maritalStatus,
      });
      setAvatar(user.avatar);
    }
  }, [user]);

  const handleSubmit = async (values) => {
    try {
      const newValues = {
        ...values,
        avatar: avatar,
      };

      const result = await profileAPI.updateProfile(newValues);

      if (result.success) {
        //update local storage
        localStorage.setItem("userInfo", JSON.stringify(result.userInfo || {}));
        toast.success("Update profile successfully!");
        onOk();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Err. Please try again!");
    }
  };

  const handleOnChangeImage = (e) => {
    Array.from(e.target.files).forEach(async (file) => {
      if (file.size <= 52428800) {
        const data = await imageUpload(file);
        setAvatar(data.url);
      } else {
        alert("Size of this file is so big!!");
      }
    });
  };

  const handleCloseForm = () => {
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="text-[20px] flex justify-center font-header">
          Edit Profile
        </div>
      }
      className="w-[800px]"
      open={isShow}
      onOk={onOk}
      onCancel={handleCloseForm}
      footer={null}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-1">
              <FormikControl
                control="input"
                type="file"
                value=""
                onChange={handleOnChangeImage}
                label="Avatar"
                name="avatar"
                hidden
              />

              <label htmlFor="avatar" className="cursor-pointer">
                {avatar ? (
                  <div className="relative">
                    <img
                      src={avatar}
                      alt=""
                      className="w-[200px] h-[125px] object-cover rounded-full"
                    />
                    <BiImageAdd className="absolute right-0 bottom-0 border border-solid border-primary p-2 rounded-full box-content bg-primary text-white" />
                  </div>
                ) : null}
              </label>
            </div>
            <div className="col-span-2">
              <FormikControl
                placeholder="Enter music name"
                control="input"
                type="text"
                label="Full name"
                name="fullName"
              />
              <FormikControl
                placeholder="Enter artist name"
                control="input"
                type="text"
                label="Username"
                name="username"
              />

              <FormikControl
                control="radio"
                label="Gender"
                name="gender"
                options={radioOptions}
              />

              <FormikControl
                control="radio"
                label="Marital status"
                name="maritalStatus"
                options={marriageOptions}
              />

              <FormikControl
                placeholder="Enter artist name"
                control="input"
                type="text"
                label="Date of birth"
                name="dateOfBirth"
              />
            </div>
          </div>

          <div className="flex gap-2 items-center justify-end mr-5">
            <span
              className="bg-white border border-solid border-black text-black cursor-pointer rounded select-none px-4 py-2"
              onClick={handleCloseForm}
            >
              Cancel
            </span>

            <button
              type="submit"
              className="bg-primary text-white rounded px-4 py-2"
            >
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default EditProfile;
