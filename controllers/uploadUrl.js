import { bucket } from "../constants.js";
import fs from "fs";
import path from "path";
import exec from "youtube-dl-exec";
import { fileURLToPath } from "url";
import { Video } from "../models/videos.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadVideoFromUrl = async (req, res) => {
  const { youtubeUrl, title } = req.body;

  if (!youtubeUrl || !title) {
    return res
      .status(400)
      .json({ error: "No youtubeUrl provided or title is missing" });
  }

  try {
    const videoPath = path.resolve(__dirname, "video.mp4");
    await exec(youtubeUrl, {
      output: videoPath,
      format: "mp4",
    });

    const blob = bucket.file(`${title || "youtube_video"}.mp4`);
    const blobStream = blob.createWriteStream();
    const fileStream = fs.createReadStream(videoPath);

    fileStream.pipe(blobStream);

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      try {
        const newVideo = new Video({
          title,
          rawVideoUrl: publicUrl,
          transcodedVideoUrl: `http://${process.env.CDN_URL}/encoded-videos-folder/${title}.mp4/`,
          // thumbnailUrl: "",
          // metaData: [{ key: "description", value: description }],
        });

        http: await newVideo.save();

        res.status(200).json({
          message: "File uploaded and video saved successfully.",
          video: newVideo,
        });
      } catch (error) {
        console.error("Error saving to MongoDB:", error);
        res.status(500).json({
          error: "Failed to save video data to MongoDB.",
          details: error.message,
        });
      }

      fs.unlinkSync(videoPath);
    });
  } catch (error) {
    console.error("Error downloading or uploading video:", error);
    res.status(500).json({
      error: "Failed to download or upload the video.",
      details: error.message,
    });
  }
};
