import mongoose, { Schema } from "mongoose";
import { Video } from "./video.models.js";
import { Comment } from "./comment.models.js";

const likeSchema = new Schema(
  {
    contentId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    contentType: {
      type: String,
      required: true,
      enum: ["Video", "Assignment", "Exam", "Comment", "Note", "Announcement", "Subject"],
      index: true,
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const SocialLike = mongoose.model("SocialLike", likeSchema);
