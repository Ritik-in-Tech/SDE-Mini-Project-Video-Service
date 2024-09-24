import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadFileController.js";
import { getVideosFromBucket } from "../controllers/getVideos.js";
import { uploadVideoFromUrl } from "../controllers/uploadUrl.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadFile);

router.get("/", getVideosFromBucket);

router.post("/uploadUrl", uploadVideoFromUrl);

export default router;
