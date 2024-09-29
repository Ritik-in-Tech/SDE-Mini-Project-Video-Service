import { bucket } from "../constants.js";
import { Video } from "../models/videos.js";
import dotenv from "dotenv";

dotenv.config();

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No Video provided" });
  }
  const { title, genre } = req.body;

  if (!title) {
    return res.status(400).json({ error: "No title provided" });
  }

  try {
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      console.error(err);
      return res.status(500).json({
        error: "Unable to upload file to Google Cloud Storage.",
        details: err.message,
      });
    });

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
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({
      error: "Failed to upload file.",
      details: error.message,
    });
  }
};
