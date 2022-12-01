import { Button } from "antd";
import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";

import moment from "moment";
import ChangePasswordDialog from "./ChangePasswordDialog";

const Profile = () => {
  const [user, setUser] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {};
    setUser(userInfo);
  }, []);

  const handleUpdateProfileSuccess = () => {
    let userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {};
    setUser(userInfo);
    setShowEditForm(false);
  };

  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="col-span-1">
        <img src={user.avatar} alt="" className="w-full rounded-full" />
      </div>
      <div className="col-span-3 text-white flex flex-col gap-3 text-[14px]">
        <h4 className="font-bold font-header text-white text-xl">
          Information
        </h4>
        <p>
          <span className="font-semibold ">Full name : </span> {user?.fullName}{" "}
        </p>
        <p>
          <span className="font-semibold "> User name : </span>
          {user?.username}{" "}
        </p>
        <p>
          <span className="font-semibold ">Date of birth : </span>
          {moment(user?.dateOfBirth).format("DD/MM/YYYY")}
        </p>
        <p>
          <span className="font-semibold ">Gender :</span> {user?.gender}
        </p>
        <p>
          <span className="font-semibold ">Marital status :</span>{" "}
          {user?.maritalStatus}
        </p>
        <p>
          <span className="font-semibold ">Email : </span> {user?.email}
        </p>
        <p>
          <span className="font-semibold "></span> My Hobbies & interested:
          walking, play soccer
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            className="text-white bg-primary"
            onClick={() => setShowEditForm(true)}
          >
            Modify Profile
          </Button>
          <Button
            className="text-white bg-primary"
            onClick={() => setShowChangePasswordForm(true)}
          >
            Change Password
          </Button>
        </div>
        <EditProfile
          isShow={showEditForm}
          user={user ? user : {}}
          onCancel={() => setShowEditForm(false)}
          onOk={handleUpdateProfileSuccess}
        />
        <ChangePasswordDialog
          isShow={showChangePasswordForm}
          onCancel={() => setShowChangePasswordForm(false)}
          onOk={() => setShowChangePasswordForm(false)}
        />
      </div>
    </div>
  );
};

export default Profile;
