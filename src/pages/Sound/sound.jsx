import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import soundAPI from "../../api/soundAPI";
import SoundItem from "./components/SoundItem";

const Sound = () => {
  const [sounds, setSounds] = useState([]);
  const getSounds = async () => {
    try {
      const result = await soundAPI.getListSound();
      setSounds(result.sounds);
    } catch (error) {
      toast.error("Cant get sounds right now. Please try again!");
    }
  };

  console.log(sounds);
  useEffect(() => {
    getSounds();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-20">
      {sounds.map((item, index) => {
        return <SoundItem sound={item} key={index} />;
      })}
    </div>
  );
};

export default Sound;
