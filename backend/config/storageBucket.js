import { Storage } from "@google-cloud/storage";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const storage = new Storage({
  keyFilename: path.join(__dirname, "../video-streaming-sde-e841869e50e7.json"),
  projectId: process.env.GCS_PROJECT_ID,
});
