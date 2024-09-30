import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactHlsPlayer from "react-hls-player";
import "./video.css";
import { API_BASE_URL_AUTH_PROD, API_BASE_URL_VIDEO_PROD } from "../config";

const VideoPlayer = () => {
  const navigate = useNavigate();

  // Accept user prop
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
console.log(authToken);
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
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL_VIDEO_PROD}/api`);
        console.log(response.data);
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getVideos();
  }, []);

  return (
    <div className="videoPlayer-main-div">
      {/* Display user details in the top-right corner */}
      {user && (
        <div style={{ position: "absolute", top: 10, right: 20 }}>
          <p>
            Logged in as: <strong>{user.name}</strong> ({user.email})
          </p>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Video Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 main-grid-video">
        {videos && videos.length > 0 ? (
          videos.map((videoData) => (
            <div key={videoData.id} className="video-container h-3">
              <ReactHlsPlayer
                src={videoData.transcodedVideoUrl.hd}
                autoPlay={false}
                controls={true}
                width="100%"
                height="100%"
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
          <p className="col-span-full text-center text-gray-600">
            No videos available
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
