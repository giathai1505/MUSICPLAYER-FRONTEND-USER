import DefaultLayout from "../layout/defaultLayout/DefaultLayout";
import Service from "../layout/service/service";
import Timer from "../layout/timer/Timer";
import Profile from "../layout/profile/Profile";
import EditProfile from "./../layout/editProfile/EditProfile";
import Music from "../pages/Music";
import Favorite from "../pages/Favorite";
import Sound from "../pages/Sound/sound";
import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/register/Register";
import ForgotPassword from "../pages/Auth/forgotPassword/ForgotPassword";
import ChangePassword from "../pages/Auth/changePassword/ChangePassword";

const routePulic = [
  {
    path: "/",
    component: DefaultLayout,
  },
  {
    path: "/home",
    component: Music,
    layout: null,
  },
  {
    path: "/timer",
    component: Timer,
    layout: null,
  },
  {
    path: "/service",
    component: Service,
    layout: null,
  },
  {
    path: "/favorite",
    component: Favorite,
    layout: null,
  },
  {
    path: "/sound",
    component: Sound,
    layout: null,
  },

  {
    path: "/login",
    component: Login,
    layout: "onlyLayout",
  },
  {
    path: "/register",
    component: Register,
    layout: "onlyLayout",
  },
  {
    path: "/forgotPassword",
    component: ForgotPassword,
    layout: "onlyLayout",
  },
  {
    path: "/reset",
    component: ChangePassword,
    layout: "onlyLayout",
  },

  {
    path: "/profile",
    component: Profile,
    layout: null,
  },

  {
    path: "/editProfile",
    component: EditProfile,
    layout: null,
  },
];
export default routePulic;
