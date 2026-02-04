import mongoose, { Schema } from "mongoose";

const visitorSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
        },
        purpose: {
            type: String,
            required: true,
        },
        whomToMeet: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        inTime: {
            type: Date,
            default: Date.now,
        },
        outTime: {
            type: Date,
        },
        idType: String,
        idNumber: String,
        status: {
            type: String,
            enum: ["IN", "OUT"],
            default: "IN",
        },
    },
    { timestamps: true }
);

export const Visitor = mongoose.model("Visitor", visitorSchema);
