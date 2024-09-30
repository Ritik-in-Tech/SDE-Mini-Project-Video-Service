import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactHlsPlayer from "react-hls-player";
import { Play } from "lucide-react";


const VideoCard = ({ video, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    onClick={onClick}
  >
    <div className="relative">
      <img
        src={video.thumbnail}
        alt={video.name}
        className="w-full h-40 object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
        <Play className="text-white" size={48} />
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold truncate">{video.name}</h3>
    </div>
  </div>
);

const App = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState([]);
  const [quality, setQuality] = useState("hd");

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  useEffect (()=> {
    const getVideos = async () => {
      const response = await axios.get('http://localhost:3000');
      console.log(response);
      setVideos(response);
    }

    getVideos();
  }, []);

  
return (
  <div className="App">
    {videos.map((videoData) => (
      <ReactHlsPlayer
        src={videoData["transcodedVideoUrl"]["hd"]}
        autoPlay={false}
        controls={true}
        width="100%"
        height="auto"
        hlsConfig={{
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          lowLatencyMode: true,
        }}
      />
    ))}
  </div>
);

  // return (
  //   <div className="container mx-auto p-4">
  //     <div className="mb-8">
  //       <ReactHlsPlayer
  //         src={currentVideo[quality]}
  //         autoPlay={false}
  //         controls={true}
  //         width="100%"
  //         height="auto"
  //         className="rounded-lg shadow-lg"
  //         hlsConfig={{
  //           maxLoadingDelay: 4,
  //           minAutoBitrate: 0,
  //           lowLatencyMode: true,
  //         }}
  //       />
  //       <div className="mt-4 flex justify-between items-center">
  //         <h2 className="text-2xl font-bold">{currentVideo.name}</h2>
  //         <select
  //           className="p-2 border border-gray-300 rounded-md"
  //           onChange={handleQualityChange}
  //           value={quality}
  //         >
  //           <option value="hd">HD</option>
  //           <option value="sd">SD</option>
  //         </select>
  //       </div>
  //     </div>
  //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  //       {videoSources.map((video) => (
  //         <VideoCard
  //           key={video.name}
  //           video={video}
  //           onClick={() => setCurrentVideo(video)}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default App;
