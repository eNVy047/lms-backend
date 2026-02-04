import mongoose, { Schema } from "mongoose";

const leaveRequestSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        leaveType: {
            type: String, // "SICK", "CASUAL", "PRIVILEGE", "LWP"
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED", "CANCELLED"],
            default: "PENDING",
        },
        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        comment: String,
    },
    { timestamps: true }
);

export const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);
