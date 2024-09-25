import { bucket } from "../constants.js";
import { generateUniqueId } from "../helpers/generate_id.js";
import { insertVideo } from "../helpers/insert_query.js";

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No Video provided" });
  }
  const { title, description } = req.body;
  try {
    const uniqueId = await generateUniqueId();

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
      await blob.setMetadata({
        metadata: {
          title,
          description,
        },
      });

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      try {
        await insertVideo(uniqueId, title, description, publicUrl);
        res.status(200).json({
          message: "File uploaded successfully.",
          fileUrl: publicUrl,
          metadata: {
            title,
            description,
            uniqueId,
          },
        });
      } catch (error) {
        res.status(500).json({
          error: "Failed to insert into database.",
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
