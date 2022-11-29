import React from "react";
import "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center mt-20">
      <img
        src={require("../../assets/images/notfound.png")}
        alt=""
        className="w-[500px]"
      />
      <button
        className="bg-primary flex items-center gap-2 text-white rounded px-3 py-2"
        onClick={() => navigate("/")}
      >
        <BiArrowBack />
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
