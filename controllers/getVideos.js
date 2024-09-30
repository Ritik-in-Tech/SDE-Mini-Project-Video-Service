import { Video } from "../models/videos.js";

export const getVideosFromDB = async (req, res) => {
  try {
    const transcodedVideos = await Video.find({
      transcodedVideoUrl: { $exists: true, $ne: null },
    }).select("transcodedVideoUrl -_id");

    if (!transcodedVideos || transcodedVideos.length === 0) {
      return res.status(404).json({ message: "No transcoded videos found" });
    }

    const formattedVideos = transcodedVideos.map((video) => ({
      transcodedVideoUrl: {
        hd: `${video.transcodedVideoUrl}media-hd.m3u8`,
        sd: `${video.transcodedVideoUrl}media-sd.m3u8`,
      },
    }));

    res.status(200).json(formattedVideos);
  } catch (error) {
    console.error("Error retrieving transcoded videos: ", error);
    res.status(500).json({
      error: "Failed to retrieve transcoded videos from the database.",
    });
  }
};
