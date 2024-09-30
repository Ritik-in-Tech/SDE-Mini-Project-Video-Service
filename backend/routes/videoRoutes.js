import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadFileController.js";
import { uploadVideoFromUrl } from "../controllers/uploadUrl.js";
import { getVideosFromDB } from "../controllers/getVideos.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadFile);

router.get("/", getVideosFromDB);

router.post("/uploadUrl", uploadVideoFromUrl);

export default router;
