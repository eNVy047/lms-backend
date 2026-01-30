import mongoose, { Schema } from "mongoose";

const attendanceRuleSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        name: {
            type: String, // e.g., "Default Student Policy", "Faculty Policy"
            required: true,
            trim: true,
        },
        targetRole: {
            type: String,
            enum: ["STUDENT", "TEACHER"],
            required: true,
        },
        // Working Days (0=Sunday, 1=Monday, ..., 6=Saturday)
        workingDays: {
            type: [Number],
            default: [1, 2, 3, 4, 5, 6], // Mon-Sat default
        },
        minAttendancePercentage: {
            type: Number,
            default: 75, // Standard requirement
            min: 0,
            max: 100,
        },
        // Late Arrival Rules
        lateGracePeriodMinutes: {
            type: Number,
            default: 15,
        },
        penaltyRules: {
            // e.g., 3 LATE = 1 ABSENT
            lateForAbsentCount: {
                type: Number,
                default: 3,
            },
            deductFromLeave: {
                type: Boolean,
                default: false
            }
        },
        sessionStartTime: {
            type: String, // "09:00"
            default: "09:00",
        },
        sessionEndTime: {
            type: String, // "17:00"
            default: "17:00",
        },
        active: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// Ensure one active rule per role per institution? 
// Or allow multiple and select per course? 
// For now, let's keep it simple: One active rule per role usually suffices, 
// but flexible enough to have named policies.

export const AttendanceRule = mongoose.model("AttendanceRule", attendanceRuleSchema);
