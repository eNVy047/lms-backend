import mongoose, { Schema } from "mongoose";
import { LmsEnum } from "../../../constants.js";

const bankDetailsSchema = new Schema({
    accountName: { type: String, required: true, trim: true },
    accountNumber: { type: String, required: true, trim: true },
    ifsc: { type: String, required: true, trim: true, uppercase: true },
    bankName: { type: String, required: true, trim: true },
    branch: { type: String, required: true, trim: true },
}, { _id: false });

const institutionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        // Contact & Domain
        email: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true
        },
        domain: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        phoneNumber: {
            type: String,
            trim: true,
            unique: true,
            index: true
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        institutionType: {
            type: String,
            enum: Object.values(LmsEnum),
            default: LmsEnum.College,
        },

        // Branding
        logo: {
            type: String, // cloudinary url
            required: true,
        },
        logoDimensions: {
            height: Number,
            width: Number
        },
        coverImage: String,

        // Registration Details
        registration: {
            number: { type: String, trim: true }, // Registration Number
            date: Date,
            certificate: String // URL
        },

        // Affiliation / Board Details
        affiliation: {
            universityOrBoard: { type: String, trim: true }, // University/Board Name
            number: { type: String, trim: true, index: true }, // Affiliation Number
            certificate: String, // URL
            validUntil: Date
        },

        // Accreditation (NAAC, NBA, etc.)
        accreditation: [{
            body: { type: String, required: true }, // e.g. NAAC
            grade: String, // e.g. A++
            validUntil: Date,
            certificate: String
        }],

        // Trust / Society / Company Info
        trustDetails: {
            name: { type: String, trim: true },
            type: { type: String, enum: ["TRUST", "SOCIETY", "COMPANY", "OTHER"] },
            registrationNumber: String,
            registrationDate: Date,
            certificate: String // URL
        },

        // Statutory & Financial
        officialIdentifiers: {
            pan: { type: String, uppercase: true, trim: true },
            panDocument: String, // URL
            gst: { type: String, uppercase: true, trim: true },
            gstDocument: String // URL
        },

        bankDetails: [bankDetailsSchema],

        // Generic Documents Bucket
        documents: [{
            name: { type: String, required: true },
            type: { type: String }, // e.g., "MOU", "Approval"
            url: { type: String, required: true },
            uploadDate: { type: Date, default: Date.now }
        }],

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

export const Institution = mongoose.model("Institution", institutionSchema)