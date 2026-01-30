import mongoose, { Schema } from "mongoose";
import { Institution } from "./institution.models.js";

const branchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    branchHead: {
      name: {
        type: String,
        trim: true,
      },
      phone: {
        countryCode: { type: String, default: "+91" },
        number: { type: String },
      },
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
    },
  },
  { timestamps: true }
);

export const Branch = mongoose.model("Branch", branchSchema);
