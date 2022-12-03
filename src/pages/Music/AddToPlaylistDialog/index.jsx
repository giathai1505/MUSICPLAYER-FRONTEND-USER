import { Modal } from "antd";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import authAPI from "../../../api/authAPI.js";
import playlistAPI from "../../../api/playlistAPI.js";
import FormikControl from "../../../components/formikCustom/FormikControl.js";

const validationSchema = Yup.object({
  playlistId: Yup.string().required("Enter your full name"),
});

const initialValues = {
  playlistId: "",
};

const AddMusicToPlaylist = ({ isShow, onOk, onCancel, item }) => {
  const [listPlaylist, setListPlaylist] = useState([]);

  const getListPlaylist = async () => {
    try {
      const result = await playlistAPI.getListPlaylist();

      //format lại list playlist như là select

      const newList = result.playlists.map((item) => {
        return { key: item._id, value: item.name };
      });

      setListPlaylist(newList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListPlaylist();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const newValues = {
      ...values,
      soundId: item._id,
    };
    console.log(newValues);
    try {
      const result = await playlistAPI.addMusicToPlaylist(newValues);
      if (result.success) {
        toast.success("Add to playlist successfully!");
        resetForm();
        onOk();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseForm = () => {
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="text-[20px] flex justify-center font-header">
          Add Song to Playlist
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
          <FormikControl
            control="select"
            label="Playlist"
            name="playlistId"
            options={listPlaylist}
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
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddMusicToPlaylist;
