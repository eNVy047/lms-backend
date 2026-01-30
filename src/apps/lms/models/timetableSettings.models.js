import mongoose, { Schema } from "mongoose";

const timetableSettingsSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true, // Only one active setting per institution usually, or per course type
        },
        name: {
            type: String, // e.g. "Main Campus Schedule"
            required: true,
            trim: true,
        },
        // Working Days
        workingDays: {
            type: [String], // ["Monday", "Tuesday", ...]
            default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        },
        // Time Configuration
        startTime: {
            type: String, // "09:00"
            required: true,
        },
        endTime: {
            type: String, // "17:00"
            required: true,
        },
        periodDuration: {
            type: Number, // in minutes, e.g., 45 or 60
            required: true,
        },
        periodsPerDay: {
            type: Number,
            required: true,
        },
        // Breaks (Lunch, Short Break)
        breaks: [
            {
                name: { type: String, required: true }, // "Lunch"
                startTime: { type: String, required: true }, // "13:00"
                endTime: { type: String, required: true }, // "14:00"
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
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

export const TimetableSettings = mongoose.model("TimetableSettings", timetableSettingsSchema);
