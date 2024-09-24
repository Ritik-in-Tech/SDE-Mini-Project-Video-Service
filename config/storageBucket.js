import { Storage } from "@google-cloud/storage";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const storage = new Storage({
  keyFilename: path.join(__dirname, "../sde-mini-project-55e8f67d46c6.json"),
  projectId: process.env.GCS_PROJECT_ID,
});
