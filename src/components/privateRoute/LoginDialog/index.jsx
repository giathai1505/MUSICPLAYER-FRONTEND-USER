import { Button, Modal } from "antd";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "react-toastify";
import soundAPI from "../../../api/soundAPI";

const LoginDialog = ({ isShow, onCancel, onSuccess }) => {
  return (
    <Modal
      title={""}
      open={true}
      onOk={onSuccess}
      onCancel={onCancel}
      footer={null}
    >
      <div>
        <div className="flex justify-center items-center flex-col">
          <RiErrorWarningLine className="text-[#00ddb2] text-[80px]" />
          <span className="font-header text-[20px]">Are you sure?</span>
        </div>

        <div className="px-10 text-center my-3">
          <span>
            Chức năng này cần phải đăng nhập. Bạn có muốn đăng nhập không ?
          </span>
        </div>
        <div className="flex justify-end items-center gap-3">
          <Button onClick={onCancel}>No</Button>
          <Button className="bg-primary text-white" onClick={onSuccess}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginDialog;
