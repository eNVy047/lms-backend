import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    description: {
      type: String,
      trim: true
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    semester: {
      type: Number,
      required: true,
      min: 1
    },
    credits: {
      type: Number,
      required: true,
      default: 0
    },
    branch: {
      type: String, // If subject is specific to a branch
      trim: true
    },
    specialization: {
      type: String, // If subject is specific to a specialization
      trim: true
    },
    isElective: {
      type: Boolean,
      default: false
    },
    // Optional default teacher mapping (Head of Subject / Coordinator)
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher"
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

subjectSchema.plugin(mongooseAggregatePaginate);

export const Subject = mongoose.model("Subject", subjectSchema);
