import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const teacherSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true
        },
        // Identifiers
        employeeId: {
            type: String,
            required: true,
            trim: true,
        },

        // Professional Details
        department: {
            type: String, // e.g. "Computer Science"
            required: true,
            trim: true
        },
        designation: {
            type: String, // e.g. "Senior Professor"
            required: true,
            trim: true
        },
        joiningDate: {
            type: Date,
            required: true
        },
        employmentType: {
            type: String,
            enum: ["PERMANENT", "CONTRACT", "GUEST", "PART_TIME"],
            default: "PERMANENT"
        },

        // Qualifications
        qualifications: [{
            degree: { type: String, required: true }, // e.g. "PhD"
            fieldOfStudy: String, // e.g. "Computer Science"
            institution: { type: String, required: true },
            year: { type: Number, required: true },
            percentage: String,
            document: String // URL
        }],
        experience: {
            type: Number, // In years
            default: 0
        },
        specializations: [{
            type: String,
            trim: true
        }],

        // Subjects & Mapping
        subjectsHandled: [{
            type: Schema.Types.ObjectId,
            ref: "Subject" // Subjects they are qualified to teach
        }],

        // Current Teaching Assignments (Mapping)
        assignments: [{
            course: { type: Schema.Types.ObjectId, ref: "Courses" },
            branch: { type: String }, // Optional if course implies it
            semester: Number,
            section: String,
            subject: { type: Schema.Types.ObjectId, ref: "Subject" }
        }],

        // Class Teacher Responsibility
        classTeacherOf: {
            course: { type: Schema.Types.ObjectId, ref: "Courses" },
            branch: String,
            semester: Number,
            section: String
        },

        // Personal Attributes not in User model
        dateOfBirth: Date,
        gender: {
            type: String,
            enum: ["MALE", "FEMALE", "OTHER"]
        },
        maritalStatus: String,

        // Documents & IDs
        aadhaarNumber: {
            type: String,
            trim: true
        },
        panNumber: {
            type: String,
            trim: true
        },
        documents: {
            resume: String, // URL
            joiningReport: String,
            aadhaarCard: String,
            panCard: String,
            experienceCertificates: [String],
            other: [{
                name: String,
                url: String
            }]
        },

        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Compound index to ensure employee ID is unique per institution
teacherSchema.index({ institution: 1, employeeId: 1 }, { unique: true });

teacherSchema.plugin(mongooseAggregatePaginate);

export const Teacher = mongoose.model("Teacher", teacherSchema);
