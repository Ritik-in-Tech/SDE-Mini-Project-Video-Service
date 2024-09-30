import { Schema, model } from "mongoose";
const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      default: "",
    },
    rawVideoUrl: {
      type: String,
      required: true,
    },
    transcodedVideoUrl: {
      type: String,
    },
    metaData: [
      {
        key: String,
        value: String,
      },
    ],
    thumbnailUrl: {
      type: String,
    },
    // ageRate: {
    //   type: String,
    //   enum: ["G", "PG", "PG-13", "R", "NC-17"],
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

export const Video = model("Videos", videoSchema);
