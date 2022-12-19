import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/defaultLayout/DefaultLayout";
import Music from "./pages/Music";
import Login from "./pages/Auth/login/Login";
import Sound from "./pages/Sound/sound";
import Register from "./pages/Auth/register/Register";
import Favorite from "./pages/Favorite";
import ForgotPassword from "./pages/Auth/forgotPassword/ForgotPassword";
import PrivateRoute from "./components/privateRoute";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Playlist from "./pages/Playlist";
import DetailPlaylist from "./pages/DetailPlaylist";
import Timer from "./layout/timer/Timer";
import ChangePassword from "./pages/Auth/changePassword/ChangePassword";
import { useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";

function App() {
  document.title = "Melody for emotion";

  useBeforeunload((event) => {
    localStorage.setItem("isAnswerQuestion", JSON.stringify(true));
  });

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Music />
            </DefaultLayout>
          }
        />
        <Route
          path="/music"
          element={
            <DefaultLayout>
              <Music />
            </DefaultLayout>
          }
        />
        <Route
          path="/favorite"
          element={
            <DefaultLayout>
              <Favorite />
            </DefaultLayout>
          }
        />
        <Route
          path="/sound"
          element={
            <DefaultLayout>
              <Sound />
            </DefaultLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DefaultLayout>
              <Profile />
            </DefaultLayout>
          }
        />
        <Route
          path="/playlist"
          element={
            <DefaultLayout>
              <Playlist />
            </DefaultLayout>
          }
        />

        <Route
          path="/playlist/:id"
          element={
            <PrivateRoute>
              <DefaultLayout>
                <DetailPlaylist />
              </DefaultLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/timer"
          element={
            <PrivateRoute>
              <DefaultLayout>
                <Timer />
              </DefaultLayout>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset" element={<ChangePassword />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
