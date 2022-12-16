import { AiFillHeart, AiOutlineSound } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";

export const listMenu = [
  {
    path: "/music",
    title: "Musics",
    icon: <FaMusic />,
  },
  {
    path: "/sound",
    title: "Sounds",
    icon: <AiOutlineSound />,
  },
  {
    path: "/favorite",
    title: "Favorite",
    icon: <AiFillHeart />,
  },
  {
    path: "/playlist",
    title: "Playlist",
    icon: <RiPlayListFill />,
  },
];
