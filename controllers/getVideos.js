import { bucket } from "../constants.js";

export const getVideosFromBucket = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();

    const fileData = await Promise.all(
      files.map(async (file) => {
        const [metadata] = await file.getMetadata();

        return {
          fileUrl: `https://storage.googleapis.com/${bucket.name}/${file.name}`,
          metadata: metadata.metadata || {},
        };
      })
    );

    res.status(200).json({
      message: "Videos retrieved successfully.",
      Videos: fileData,
    });
  } catch (error) {
    console.error("Error retrieving files: ", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve files from the bucket." });
  }
};
