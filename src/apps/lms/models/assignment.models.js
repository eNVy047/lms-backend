import mongoose, { Schema } from "mongoose";
import { SubAssignment } from "./submittedAssignment.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const assignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    document: {
      type: [
        {
          url: String,
          localPath: String,
        },
      ],
      default: [],
    },
    submitted: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "SubAssignment",
        },
      ],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
    },
  },
  { timestamps: true }
);

assignmentSchema.plugin(mongooseAggregatePaginate);

export const Assignment = mongoose.model("Assignment", assignmentSchema);
