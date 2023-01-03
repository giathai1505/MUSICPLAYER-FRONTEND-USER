import { Modal } from "antd";
import { Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import authAPI from "../../../api/authAPI.js";
import FormikControl from "../../../components/formikCustom/FormikControl.js";

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Please enter your old password"),
  newPassword: Yup.string().required("Please enter your new password"),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ),
});

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
const ChangePasswordDialog = ({ isShow, onOk, onCancel }) => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await authAPI.changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      if (result.success) {
        toast.success("Change password successfully !");
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
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="text-[20px] flex justify-center font-header">
          Change Password
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
            placeholder="Enter current password"
            control="input"
            type="password"
            label="Current password"
            name="oldPassword"
          />
          <FormikControl
            placeholder="Enter new password"
            control="input"
            type="password"
            label="New password"
            name="newPassword"
          />
          <FormikControl
            placeholder="Confirm new password"
            control="input"
            type="password"
            label="Confirm new password"
            name="confirmNewPassword"
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

export default ChangePasswordDialog;
