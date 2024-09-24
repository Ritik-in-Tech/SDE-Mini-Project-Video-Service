import { bucket } from "../constants.js";
export const getVideosFromBucket = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();

    const fileUrls = files.map((file) => {
      return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    });

    res.status(200).json({
      message: "Files retrieved successfully.",
      files: fileUrls,
    });
  } catch (error) {
    console.error("Error retrieving files: ", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve files from the bucket." });
  }
};
