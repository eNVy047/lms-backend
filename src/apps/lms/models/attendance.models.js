import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const attendanceSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        date: {
            type: Date,
            required: true,
            index: true,
        },
        // Tracking target: Student OR Teacher
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
        },
        // Attendance Mode
        type: {
            type: String,
            enum: ["DAILY", "SUBJECT_WISE"], // DAILY = Entrance/Exit, SUBJECT_WISE = Specific class
            default: "DAILY",
            required: true,
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            // Required if type is SUBJECT_WISE
        },
        status: {
            type: String,
            enum: ["PRESENT", "ABSENT", "LATE", "EXCUSED", "HALF_DAY"],
            required: true,
            default: "PRESENT",
            index: true,
        },
        checkInTime: {
            type: Date, // For DAILY attendance detailed tracking
        },
        checkOutTime: {
            type: Date,
        },
        markedBy: {
            type: Schema.Types.ObjectId,
            ref: "User", // Admin or Teacher who marked it
            required: true,
        },
        remarks: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// Indexes for common queries
attendanceSchema.index({ student: 1, date: 1 });
attendanceSchema.index({ teacher: 1, date: 1 });
attendanceSchema.index({ subject: 1, date: 1 });

// Ensure one record per student/teacher per day/subject
// Creating a compound unique index is tricky with optional fields, 
// so strictly we might rely on application logic or partial indexes. 
// For efficient unique constraints, we can use a partial unique index:

// 1. Student Daily Attendance Unique
attendanceSchema.index(
    { student: 1, date: 1, type: 1 },
    { unique: true, partialFilterExpression: { type: "DAILY", student: { $exists: true } } }
);

// 2. Teacher Daily Attendance Unique
attendanceSchema.index(
    { teacher: 1, date: 1, type: 1 },
    { unique: true, partialFilterExpression: { type: "DAILY", teacher: { $exists: true } } }
);

// 3. Student Subject Attendance Unique
attendanceSchema.index(
    { student: 1, date: 1, subject: 1 },
    { unique: true, partialFilterExpression: { type: "SUBJECT_WISE", student: { $exists: true } } }
);

attendanceSchema.plugin(mongooseAggregatePaginate);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
