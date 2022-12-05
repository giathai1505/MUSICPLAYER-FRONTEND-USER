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
import { useEffect } from "react";

function App() {
  document.title = "Melody for emotion";

  return (
    <div className="App">
      <Routes>
        <Route
          path="/music"
          element={
            <PrivateRoute>
              <DefaultLayout>
                <Music />
              </DefaultLayout>
            </PrivateRoute>
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
            <DefaultLayout>
              <DetailPlaylist />
            </DefaultLayout>
          }
        />
        <Route
          path="/timer"
          element={
            <DefaultLayout>
              <Timer />
            </DefaultLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
