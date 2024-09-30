import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactHlsPlayer from "react-hls-player";
import { API_BASE_URL } from "./config";

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}`);
        console.log(response.data);
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getVideos();
  }, []);

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
    </div>
  );
};

export default App;