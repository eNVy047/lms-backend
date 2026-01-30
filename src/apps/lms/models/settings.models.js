import mongoose, { Schema } from "mongoose";

const settingsSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            unique: true, // One settings doc per institution
            index: true,
        },

        // UI & Branding (Theme)
        theme: {
            primaryColor: { type: String, default: "#2563EB" }, // Blue-600 default
            secondaryColor: { type: String, default: "#1E293B" }, // Slate-800
            accentColor: { type: String, default: "#F59E0B" }, // Amber-500
            mode: {
                type: String,
                enum: ["LIGHT", "DARK", "SYSTEM"],
                default: "LIGHT",
            },
            fontFamily: { type: String, default: "Inter" },
            borderRadius: { type: String, default: "0.5rem" },
        },

        // Global Site Settings
        general: {
            siteName: { type: String, trim: true }, // Override institution name if needed
            tagline: { type: String, trim: true },
            timeZone: { type: String, default: "Asia/Kolkata" },
            dateFormat: { type: String, default: "DD/MM/YYYY" },
            currency: { type: String, default: "INR" },
            language: { type: String, default: "en" },
        },

        // SEO Configuration
        seo: {
            metaTitle: { type: String, trim: true },
            metaDescription: { type: String, trim: true },
            keywords: [String],
            ogImage: String, // Social sharing image
            favicon: String, // URL
        },

        // Feature Toggles (Access Control)
        features: {
            enableStudentPortal: { type: Boolean, default: true },
            enableParentPortal: { type: Boolean, default: true },
            enableOnlineFees: { type: Boolean, default: true },
            enableLibrary: { type: Boolean, default: true },
            enableAttendance: { type: Boolean, default: true },
        },

        // Social Links
        socialMedia: {
            facebook: String,
            twitter: String,
            linkedin: String,
            instagram: String,
            youtube: String,
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

export const Settings = mongoose.model("Settings", settingsSchema);
