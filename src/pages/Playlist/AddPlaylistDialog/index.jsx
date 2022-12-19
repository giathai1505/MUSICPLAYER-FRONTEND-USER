import { Modal } from "antd";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { toast } from "react-toastify";
import * as Yup from "yup";
import authAPI from "../../../api/authAPI.js";
import playlistAPI from "../../../api/playlistAPI.js";
import FormikControl from "../../../components/formikCustom/FormikControl.js";
import useImageUpload from "../../../hooks/useUpLoadFile.js";

const validationSchema = Yup.object({
  name: Yup.string().required("Enter your full name"),
  description: Yup.string().required("Enter description"),
});

const initialValues = {
  name: "",
  description: "",
  image: "",
};

const AddPlaylistDialog = ({ isShow, onOk, onCancel }) => {
  const [imageSelected, setImageSelected] = useState();
  const imageUpload = useImageUpload();
  const handleSubmit = async (values, { resetForm }) => {
    const newValues = {
      ...values,
      image: imageSelected,
    };

    try {
      const result = await playlistAPI.createPlaylist(newValues);
      if (result.success) {
        toast.success("Create playlist successfully!");
        resetForm();
        onOk();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("There is something wrong. Please try again!!");
    }
  };

  const handleCloseForm = () => {
    setImageSelected(undefined);
    onCancel();
  };

  const handleOnChangeImage = (e) => {
    Array.from(e.target.files).forEach(async (file) => {
      if (file.size <= 52428800) {
        const data = await imageUpload(file);
        setImageSelected(data.url);
      } else {
        alert("Size of this file is so big!!");
      }
    });
  };

  return (
    <Modal
      title={
        <div className="text-[20px] flex justify-center font-header">
          Add New Playlist
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
          <div>
            <FormikControl
              control="input"
              type="file"
              value=""
              onChange={handleOnChangeImage}
              label="Image"
              name="image"
              hidden
            />

            <label htmlFor="image" className="cursor-pointer">
              <div className="flex items-center gap-1 bg-primary text-white px-2 cursor-pointer py-1 rounded-lg w-fit">
                <AiOutlineFileImage />
                <span>Add image</span>
              </div>
            </label>
            {imageSelected ? (
              <img src={imageSelected} alt="" className="w-[200px] rounded" />
            ) : null}
          </div>
          <FormikControl
            placeholder="Enter name"
            control="input"
            type="text"
            label="Playlist name"
            name="name"
          />
          <FormikControl
            placeholder="Enter description"
            control="textarea"
            type="text"
            label="Description"
            name="description"
          />

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
              Add
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddPlaylistDialog;
