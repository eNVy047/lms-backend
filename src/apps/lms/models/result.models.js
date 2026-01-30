import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const resultSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    contentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
      enum: ["Quizz", "Assignment", "Exam", "Other"],
    },
    resultType: {
      type: String,
      required: true,
      enum: ["MID-TERM", "FINAL", "QUICK-TEST", "INTERNAL", "EXTERNAL", "OTHERS"],
      default: "INTERNAL"
    },
    score: {
      type: Number,
      required: true
    },
    totalScore: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number
    },
    grade: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PASS", "FAIL", "ABSENT", "PENDING"],
      default: "PENDING"
    },
    publishedAt: {
      type: Date
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

resultSchema.plugin(mongooseAggregatePaginate);

export const Result = mongoose.model("Result", resultSchema);
