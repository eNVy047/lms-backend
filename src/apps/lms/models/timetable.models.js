import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const timetableSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        // Academic Context
        course: {
            type: Schema.Types.ObjectId,
            ref: "Courses",
            required: true,
        },
        branch: {
            type: String, // Optional filter
        },
        semester: {
            type: Number,
            required: true,
        },
        section: {
            type: Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        },
        batch: {
            type: String, // e.g., "2023-2027"
        },

        // Schedule Details
        dayOfWeek: {
            type: String,
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            required: true,
            index: true,
        },
        startTime: {
            type: String, // "09:00"
            required: true,
        },
        endTime: {
            type: String, // "10:00"
            required: true,
        },
        periodNumber: {
            type: Number, // 1, 2, 3...
        },

        // Content
        subject: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
        },
        roomNumber: {
            type: String,
            trim: true,
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

// Indexes for conflict checking
// 1. Teacher cannot be in two places at once
timetableSchema.index({ teacher: 1, dayOfWeek: 1, startTime: 1 }, { unique: true });

// 2. Section cannot have two classes at once
timetableSchema.index({ section: 1, dayOfWeek: 1, startTime: 1 }, { unique: true });

timetableSchema.plugin(mongooseAggregatePaginate);

export const Timetable = mongoose.model("Timetable", timetableSchema);
