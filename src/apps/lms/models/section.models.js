import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const sectionSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        name: {
            type: String, // e.g., "A", "B", "C"
            required: true,
            trim: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Courses",
            required: true,
        },
        branch: {
            type: String, // Optional, if sections are branch-specific
            trim: true,
        },
        semester: {
            type: Number,
            required: true,
            min: 1,
        },
        batch: {
            type: String, // e.g., "2023-2027"
            required: true,
            trim: true,
        },
        // Capacity planning
        capacity: {
            type: Number,
            default: 60,
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
    },
    { timestamps: true }
);

// Ensure unique section name per batch+course+semester(+branch)
sectionSchema.index({ institution: 1, course: 1, branch: 1, semester: 1, batch: 1, name: 1 }, { unique: true });

sectionSchema.plugin(mongooseAggregatePaginate);

export const Section = mongoose.model("Section", sectionSchema);
