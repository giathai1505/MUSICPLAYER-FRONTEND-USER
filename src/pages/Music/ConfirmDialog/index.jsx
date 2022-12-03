import { Button, Modal } from "antd";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "react-toastify";
import soundAPI from "../../../api/soundAPI";

const ConfirmDialog = ({ item, isShow, onCancel, onSuccess }) => {
  const handleDeleteMusic = async () => {
    console.log(item._id);
    try {
      const result = await soundAPI.addToFavorite({ soundId: item._id });
      localStorage.setItem("userInfo", JSON.stringify(result.userInfo));
      toast.success("Add to favorite successfully !!");
    } catch (error) {
      toast.error("Err. Please try again");
    }
    onSuccess();
  };
  return (
    <Modal
      title={""}
      open={isShow}
      onOk={handleDeleteMusic}
      onCancel={onCancel}
      footer={null}
    >
      <div>
        <div className="flex justify-center items-center flex-col">
          <RiErrorWarningLine className="text-[#00ddb2] text-[80px]" />
          <span className="font-header text-[20px]">Are you sure?</span>
        </div>

        <div className="px-10 text-center my-3">
          Do you want to add&nbsp;"
          <span className="font-semibold">{item && item.name}</span>" to your
          favorite list ?
        </div>
        <div className="flex justify-end items-center gap-3">
          <Button onClick={onCancel}>No</Button>
          <Button className="bg-primary text-white" onClick={handleDeleteMusic}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
