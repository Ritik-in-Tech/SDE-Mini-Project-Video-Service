import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import VideoPlayer from "./pages/video";
import "./App.css";
import { API_BASE_URL_AUTH_PROD } from "./config";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      fetch(`${API_BASE_URL_AUTH_PROD}/api/v1/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.status === 200) {
            setUser(data.data); // Store user details in state
            navigate("/videoPlayer");
          } else {
            localStorage.removeItem("authToken");
            navigate("/login");
          }
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <nav>
        <ul>
          {!user ? ( // Conditionally render Sign Up and Login links
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <li style={{ float: "right", marginRight: "10px" }}></li>
          )}
        </ul>
      </nav>

<<<<<<< HEAD
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/videoPlayer"
          element={<VideoPlayer user={user} />} // Pass user details as props
        />
      </Routes>
=======
  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Video Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos && videos.length > 0 ? (
          videos.map((videoData) => (
            <div key={videoData.id} className="video-container h-3">
              <ReactHlsPlayer
                src={videoData.transcodedVideoUrl.hd}
                autoPlay={false}
                controls={true}
                width="50%"
                height="50%"
                playerRef={React.createRef()}
                hlsConfig={{
                  maxLoadingDelay: 4,
                  minAutoBitrate: 0,
                  lowLatencyMode: true,
                }}
              />
              <h3 className="mt-2 text-lg font-semibold">{videoData.name}</h3>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No videos available</p>
        )}
      </div>
>>>>>>> e7171c640a65460cfec407c8d1907868157e9838
    </div>
  );
};

export default App;