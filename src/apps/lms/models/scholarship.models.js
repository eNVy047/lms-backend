import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const scholarshipSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        name: {
            type: String, // e.g. "Merit Scholarship 2024"
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["GOVERNMENT", "PRIVATE", "MERIT_BASED", "NEED_BASED", "INSTITUTIONAL"],
            required: true,
        },
        provider: {
            type: String, // e.g. "State Govt", "University Trust"
            trim: true,
        },
        description: {
            type: String, // Eligibility criteria detailed text
            trim: true,
        },
        // Calculation Logic
        amountType: {
            type: String,
            enum: ["FIXED", "PERCENTAGE"],
            required: true,
        },
        value: {
            type: Number, // e.g., 5000 (Fixed) or 10 (Percentage)
            required: true,
            min: 0,
        },
        // Constraints
        minPercentageRequired: {
            type: Number, // e.g. 85% marks needed
        },
        maxIncomeLimit: {
            type: Number, // Family income limit
        },
        isActive: {
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

scholarshipSchema.plugin(mongooseAggregatePaginate);

export const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

const scholarshipApplicationSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        scholarship: {
            type: Schema.Types.ObjectId,
            ref: "Scholarship",
            required: true,
        },
        status: {
            type: String,
            enum: ["APPLIED", "UNDER_REVIEW", "APPROVED", "REJECTED", "DISBURSED"],
            default: "APPLIED",
            index: true
        },
        appliedDate: {
            type: Date,
            default: Date.now
        },

        // Approval Details
        approvedDate: Date,
        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: "User" // Admin/Approver
        },
        rejectionReason: String,

        // Disbursal Details
        disbursedAmount: {
            type: Number, // The actual amount calculated and waived/paid
            default: 0
        },
        disbursedDate: Date,
        remarks: String,

        // Documents associated (Income certificate, Caste certificate etc)
        documents: [{
            name: String,
            url: String
        }]
    },
    { timestamps: true }
);

scholarshipApplicationSchema.plugin(mongooseAggregatePaginate);

export const ScholarshipApplication = mongoose.model("ScholarshipApplication", scholarshipApplicationSchema);
