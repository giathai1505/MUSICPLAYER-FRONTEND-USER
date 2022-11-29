import { Button, Modal } from "antd";
import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";

const Dialog = ({ message, isShow, onCancel, onSuccess, type }) => {
  return (
    <Modal
      title={""}
      open={isShow}
      onOk={onSuccess}
      onCancel={onCancel}
      footer={null}
    >
      <div>
        <div className="flex justify-center items-center flex-col">
          {type === "delete" ? (
            <AiOutlineWarning className="text-[#f82d2a] text-[80px]" />
          ) : (
            <RiErrorWarningLine className="text-[#00ddb2] text-[80px]" />
          )}

          <span className="font-header text-[20px]">Are you sure?</span>
        </div>

        <div className="px-10 text-center my-3">{message}</div>
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

export default Dialog;
