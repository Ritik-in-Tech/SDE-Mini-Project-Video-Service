import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadController.js";
import { getVideosFromBucket } from "../controllers/getVideos.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadFile);

router.get("/", getVideosFromBucket);

export default router;
