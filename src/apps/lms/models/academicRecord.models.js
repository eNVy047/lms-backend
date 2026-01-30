import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const academicRecordSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        exam: {
            type: Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        marksObtained: {
            type: Number,
            required: true,
            min: 0,
        },
        totalMarks: {
            type: Number,
            required: true,
            min: 0,
        },
        grade: {
            type: String, // e.g., "A+", "B", "F"
            required: true,
            trim: true,
        },
        remarks: {
            type: String,
            trim: true,
        },

        // Entry Workflow
        status: {
            type: String,
            enum: ["DRAFT", "SUBMITTED", "APPROVED"],
            default: "DRAFT"
        },

        // Audit Log for Re-evaluation / Corrections
        history: [{
            updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
            updatedAt: { type: Date, default: Date.now },
            previousMarks: Number,
            newMarks: Number,
            reason: String // e.g., "Re-evaluation", "Typo correction"
        }],
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true, // Admin/Teacher who entered the record
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

// Prevent duplicate records for the same student, exam, and subject
academicRecordSchema.index({ student: 1, exam: 1, subject: 1 }, { unique: true });

academicRecordSchema.plugin(mongooseAggregatePaginate);

export const AcademicRecord = mongoose.model("AcademicRecord", academicRecordSchema);
