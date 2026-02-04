import mongoose, { Schema } from "mongoose";

const hostelSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        name: {
            type: String, // e.g., "Boys Hostel A", "Girls Hostel B"
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["BOYS", "GIRLS", "STAFF", "MIXED"],
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        warden: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        address: String,
    },
    { timestamps: true }
);

export const Hostel = mongoose.model("Hostel", hostelSchema);

const hostelRoomSchema = new Schema(
    {
        hostel: {
            type: Schema.Types.ObjectId,
            ref: "Hostel",
            required: true,
        },
        roomNumber: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        occupancy: {
            type: Number,
            default: 0,
        },
        roomType: {
            type: String, // e.g., "AC", "NON-AC", "DELUXE"
        },
        pricePerSemester: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["AVAILABLE", "FULL", "MAINTENANCE"],
            default: "AVAILABLE",
        },
    },
    { timestamps: true }
);

export const HostelRoom = mongoose.model("HostelRoom", hostelRoomSchema);

const hostelAllotmentSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: "HostelRoom",
            required: true,
        },
        allotmentDate: {
            type: Date,
            default: Date.now,
        },
        vacateDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "VACATED"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

export const HostelAllotment = mongoose.model("HostelAllotment", hostelAllotmentSchema);
