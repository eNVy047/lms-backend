import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { Specialization } from "./specialization.models.js";

const branchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specializations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Specialization",
    }
  ]
});

const coursesSchema = new Schema(
  {
    name: {
      type: String, // e.g., B.Tech, M.Tech, MBA
      required: true,
      trim: true,
    },
    capacity: {
      type: Number, // Total intake capacity
      default: 60,
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
    },
    branches: [branchSchema],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

coursesSchema.plugin(mongooseAggregatePaginate);

export const Courses = mongoose.model("Courses", coursesSchema);
