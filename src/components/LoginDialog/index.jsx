import { Button, Modal } from "antd";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LoginDialog = ({ isShow, onCancel, onSuccess }) => {
  const navigate = useNavigate();
  return (
    <Modal
      title={""}
      open={isShow}
      onOk={onSuccess}
      onCancel={() => navigate(-1)}
      footer={null}
    >
      <div>
        <div className="flex justify-center items-center flex-col">
          <RiErrorWarningLine className="text-[#00ddb2] text-[80px]" />
          <span className="font-header text-[20px]">Question?</span>
        </div>

        <div className="px-10 text-center my-3">
          <span>
            Chức năng này cần phải đăng nhập. Bạn có muốn đăng nhập không ?
          </span>
        </div>
        <div className="flex justify-end items-center gap-3">
          <Button onClick={() => navigate(-1)}>No</Button>
          <Button className="bg-primary text-white" onClick={onSuccess}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginDialog;
