import { useDispatch } from "react-redux";
import { LoginPage, SignInPage } from "./component/index.js"
import Layout from "./Layout.jsx";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "./store/Slices/authSlice.js";
import AuthLayout from "./component/AuthLayout.jsx";
import { Toaster } from "react-hot-toast";
import HomePage from "./component/HomePage.jsx";
import VideoDetail from "./component/VideoDetail.jsx";
import UsersLikedVideos from "./component/UsersLikedVideos.jsx";
import WatchHistory from "./component/WatchHistory.jsx";
import UserSubscribedChannel from "./component/UserSubscribedChannel.jsx";
import Channel from "./component/Channel.jsx";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path=""
            element={
              <AuthLayout authentication={false}>
                <HomePage />
              </AuthLayout>
            }
          />
          <Route
            path="/watch/:videoId"
            element={
              <AuthLayout authentication>
                <VideoDetail />
              </AuthLayout>
            }
          />
          <Route
            path="/history"
            element={
              <AuthLayout authentication>
                <WatchHistory />
              </AuthLayout>
            }
          />
          <Route
            path="/liked-videos"
            element={
              <AuthLayout authentication>
                <UsersLikedVideos />
              </AuthLayout>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <AuthLayout authentication>
                <UserSubscribedChannel />
              </AuthLayout>
            }
          />
          <Route
            path="/channel"
            element={
              <AuthLayout authentication>
                <Channel/>
              </AuthLayout>
            }
          />


        </Route>
        <Route
          path="/login"
          element={
            <AuthLayout authentication={false}>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout authentication={false}>
              <SignInPage />
            </AuthLayout>
          }
        />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2000,
        }}
      />
    </>
  )
}

export default App
