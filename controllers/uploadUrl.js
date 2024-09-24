import { bucket } from "../constants.js";
import fs from "fs";
import path from "path";
import exec from "youtube-dl-exec";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadVideoFromUrl = async (req, res) => {
  const { videoUrl, title, description } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: "No Video URL provided" });
  }

  try {
    const videoPath = path.resolve(__dirname, "video.mp4");
    await exec(videoUrl, {
      output: videoPath,
      format: "mp4",
    });

    const blob = bucket.file(`${title || "youtube_video"}.mp4`);
    const blobStream = blob.createWriteStream();
    const fileStream = fs.createReadStream(videoPath);

    fileStream.pipe(blobStream);

    blobStream.on("finish", async () => {
      await blob.setMetadata({
        metadata: {
          title,
          description,
        },
      });

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).json({
        message: "YouTube video uploaded successfully.",
        fileUrl: publicUrl,
        metadata: {
          title,
          description,
        },
      });

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
