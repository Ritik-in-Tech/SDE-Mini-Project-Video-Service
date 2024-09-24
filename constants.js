import dotenv from "dotenv";
dotenv.config();
import { storage } from "./config/storageBucket.js";

export const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
