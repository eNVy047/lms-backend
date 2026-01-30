import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const examSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        examType: {
            type: String,
            enum: ["Mid-Term", "End-Term", "Practical", "Internal"],
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Courses",
            required: true,
        },
        semester: {
            type: Number,
            required: true,
            min: 1,
        },
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        // Result Publishing Workflow
        publishStatus: {
            type: String,
            enum: ["DRAFT", "REVIEW", "PUBLISHED"],
            default: "DRAFT",
            index: true
        },
        publishedAt: {
            type: Date
        },
        publishedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

examSchema.plugin(mongooseAggregatePaginate);

export const Exam = mongoose.model("Exam", examSchema);
